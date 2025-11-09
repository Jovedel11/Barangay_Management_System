import type { Request, Response, NextFunction } from "express";
import { AvailableDocs, DocsModel } from "@/models/documents.model";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";
import ProccessNotif from "@/lib/process.notif";
import { BorrowableItemsModel } from "@/models/borrow.items";
import { UploadFile } from "@/lib/upload.file";

type Update = {
  model: Model<any>;
  sendNotif?: boolean;
  detailsToSend?: string;
  linkToSend?: string;
  isItem?: boolean;
  sendToResident?: boolean;
  isDocs?: boolean;
};

const requestDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const data = matchedData(req);
    const newDocData: any = { ...data };
    console.log("newDocData:", newDocData);
    const docs = await DocsModel.insertOne(newDocData);

    const result = await ProccessNotif({
      resident_id: data.user,
      data_name: data.name,
      data_category: data.category,
      details: "has requested a document",
      link: "/admin/manage-documents",
    });

    if (!result?.success) throw new Error("Error in processing notif");

    return res.status(201).json({
      message: "Document successfully requested",
      document: docs,
    });
  } catch (error) {
    console.log("Error in request docs:", error);
    next(error);
  }
};

// Creating docs (admin)
const createDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);
    console.log("Data:", data);
    const availabDocs = await AvailableDocs.create({ ...data });
    availabDocs.save();
    return res.status(201).json({
      message: "Document successfully created",
    });
  } catch (error) {
    console.log("Error in create docs:", error);
    next(error);
  }
};

// Deleting docs (admin)
const deleteDocs = ({ model: CollectionModel }: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Docs : Invalid fields");
      }
      const { docs_id } = matchedData(req);
      const { deletedCount } = await CollectionModel.deleteOne({
        _id: docs_id,
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res.status(200).json({ message: "Document successfully deleted" });
    } catch (error) {
      next(error);
    }
  };
};

// Updating Docs (reusable)
const updateDocs = ({
  model: CollectionModel,
  sendNotif = false,
  detailsToSend = "has processed your document",
  linkToSend,
  isItem = false,
  sendToResident = true,
  isDocs = false,
}: Update) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Errors : ", errors.array());
        throw new Error("Docs : Invalid fields");
      }

      const data = matchedData(req);
      const { docs_id, ...updateFields } = data;
      console.log("Fileeeeeeeeeeeeeeeee :", req.file);

      if (isDocs && req.file) {
        const uploadResult = await UploadFile({
          file: req.file,
          userId: (req.user as any)?._id,
        });

        updateFields.fileName = uploadResult.fileName;
        updateFields.fileSrc = uploadResult.filePath;
      }
      Object.keys(updateFields).forEach((key) => {
        if (
          updateFields[key] &&
          typeof updateFields[key] === "object" &&
          Object.keys(updateFields[key]).length === 0
        ) {
          delete updateFields[key];
        }
      });

      const { matchedCount, modifiedCount } = await CollectionModel.updateOne(
        { _id: docs_id },
        {
          $set: {
            ...updateFields,
            ...(isDocs ? { recieveDate: new Date() } : {}),
          },
        }
      );

      if (matchedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }

      if (modifiedCount === 0) {
        return res.status(400).json({
          success: false,
          message: "No changes made to the document",
        });
      }

      // Send notification if required
      if (sendNotif && linkToSend) {
        const data = await CollectionModel.findById(docs_id);
        const result = await ProccessNotif({
          resident_id: data.user,
          data_name: isItem ? data.category : data.name ?? data.service,
          data_category: data.category,
          details: detailsToSend,
          link: linkToSend,
          sendToResident,
        });
        if (!result?.success) throw new Error("Error in processing notif");
      }

      if (isItem) {
        let quantityChange = 0;
        switch (data.status) {
          case "returned":
          case "rejected":
            quantityChange = data.quantity;
            break;
          case "approved":
          case "reserved":
            quantityChange = -data.quantity;
            break;
          case "processing":
          case "pending":
            quantityChange = 0;
            break;
          default:
            quantityChange = 0;
        }
        if (quantityChange !== 0) {
          const update_result = await BorrowableItemsModel.updateOne(
            { _id: data.main_item },
            {
              $inc: { available: quantityChange },
            }
          );

          if (update_result.modifiedCount === 0) {
            throw new Error("Failed to update item");
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: "Document successfully updated",
        modifiedCount,
      });
    } catch (error) {
      next(error);
    }
  };
};

// Retrieve all docs (reusable)
const retrieveAllDocs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Docs : Invalid fields");
    }
    const docs = await AvailableDocs.find();
    if (!docs || docs.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }
    return res.status(200).json({ documents: docs });
  } catch (error) {
    next(error);
  }
};

export { requestDocs, createDocs, deleteDocs, updateDocs, retrieveAllDocs };
