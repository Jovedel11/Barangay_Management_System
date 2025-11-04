import ProccessNotif from "@/lib/process.notif";
import { BrgyService, ServiceRequest } from "@/models/brgy.services";
import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";

type Create = {
  model: Model<any>;
  sendNotif?: boolean;
};
const createService = ({
  model: CollectionModel,
  sendNotif = false,
}: Create) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const { service_id, ...data } = matchedData(req);
      if (sendNotif) {
        console.log(service_id);
        const { matchedCount, modifiedCount } = await BrgyService.updateOne(
          { _id: service_id },
          { $inc: { slots: -1 } }
        );
        if (matchedCount === 0 || modifiedCount === 0) {
          throw new Error("Error in decreasing the slots");
        }
        const result = await ProccessNotif({
          resident_id: data.user,
          data_name: data.service,
          data_category: data.category,
          details: "has booked a service",
          link: "/admin/manage-services",
        });
        if (!result?.success) throw new Error("Error in processing notif");
      }
      const service = await CollectionModel.create({
        ...data,
        request_id: service_id,
      });
      service.save();
      return res.status(201).json({
        message: "Document successfully created",
      });
    } catch (error) {
      console.log("Error in create docs:", error);
      next(error);
    }
  };
};

const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Request Body: ", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Service : Invalid fields");
    }
    const data = matchedData(req);
    const { docs_id, status, ...updateFields } = data;
    Object.keys(updateFields).forEach((key) => {
      if (
        updateFields[key] &&
        typeof updateFields[key] === "object" &&
        Object.keys(updateFields[key]).length === 0
      ) {
        delete updateFields[key];
      }
    });
    const service = await ServiceRequest.findById(docs_id);
    if (!service) throw new Error();
    const success = await BrgyService.updateOne(
      { _id: service.request_id },
      {
        $inc:
          status?.toLowerCase() !== "completed" &&
          service?.status?.toLowerCase() === "completed"
            ? { slots: -1 }
            : status?.toLowerCase() === "completed"
            ? { slots: 1 }
            : {},
      }
    );
    if (success?.matchedCount === 0) {
      throw new Error();
    }
    const { matchedCount, modifiedCount } = await ServiceRequest.updateOne(
      { _id: docs_id },
      {
        $set: { ...updateFields, status },
      }
    );

    if (matchedCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (modifiedCount === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No changes made to the document" });
    }
    const result = await ProccessNotif({
      resident_id: service.user,
      data_name: service.service,
      data_category: service.category,
      details: "has processed your service request",
      link: "/resident/barangay-services",
      sendToResident: true,
    });
    if (!result?.success) throw new Error("Error in processing notif");
    return res.status(200).json({
      success: true,
      message: "Document successfully updated",
      modifiedCount,
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Book item: Invalid fields");
      }
      const { service_id } = matchedData(req);
      const { deletedCount } = await CollectionModel.deleteOne({
        _id: service_id,
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(200).json({ message: "Item successfully deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

export { createService, deleteService, updateService };
