import ProccessNotif from "@/lib/process.notif";
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
      const data = matchedData(req);
      const service = await CollectionModel.create({ ...data });
      service.save();
      if (sendNotif) {
        const result = await ProccessNotif({
          resident_id: data.user,
          data_name: data.service,
          data_category: data.category,
          details: "has booked a service",
          link: "/admin/manage-services",
        });
        if (!result?.success) throw new Error("Error in processing notif");
      }
      return res.status(201).json({
        message: "Document successfully created",
      });
    } catch (error) {
      console.log("Error in create docs:", error);
      next(error);
    }
  };
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

export { createService, deleteService };
