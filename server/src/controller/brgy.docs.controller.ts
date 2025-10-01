import type { Request, Response, NextFunction } from "express";
import { AvailableDocs, DocsModel } from "@/models/documents.model";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";

// Send docs request (resident)
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
    const docs = await DocsModel.create({ ...data }); // Requires user ID to reference the account collection
    console.log(data);
    return res
      .status(201)
      .json({ message: "Document successfully requested", document: docs });
  } catch (error) {
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
const updateDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      throw new Error("Docs : Invalid fields");
    }
    const data = matchedData(req);

    const { docs_id, ...updateFields } = data;
    Object.keys(updateFields).forEach((key) => {
      if (
        updateFields[key] &&
        typeof updateFields[key] === "object" &&
        Object.keys(updateFields[key]).length === 0
      ) {
        delete updateFields[key];
      }
    });

    const { matchedCount, modifiedCount } = await AvailableDocs.updateOne(
      { _id: docs_id },
      { $set: updateFields }
    );

    if (matchedCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "No changes made to the document" });
    }

    return res.status(200).json({
      message: "Document successfully updated",
      modifiedCount,
    });
  } catch (error) {
    next(error);
  }
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
