import type { Request, Response, NextFunction } from "express";
import { AvailableDocs, DocsModel } from "@/models/documents.model";
import { matchedData, validationResult } from "express-validator";

// Send docs request (resident)
const requestDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const data = matchedData(req);
    const docs = await DocsModel.create({ ...data }); // Requires user ID to reference the account collection
    docs.save();
    res.send(200).json({ message: "Document succesfully requested" });
  } catch (error) {
    next(error);
  }
};

// Creating docs (admin)
const createDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Docs: Invalid fields");
    }
    const data = matchedData(req);
    const availabDocs = await AvailableDocs.create({ ...data });
    availabDocs.save();
    res.send(200).json({ message: "Document succesfully requested" });
  } catch (error) {
    next(error);
  }
};

// Deleting docs (admin)
const deleteDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Docs : Invalid fields");
    }
    const { docs_id } = matchedData(req);
    const { deletedCount } = await AvailableDocs.deleteOne({ docs_id });
    if (deletedCount === 0) {
      throw new Error("Docs deletion: Failed to delete the docs");
    }
    res.send(200).json({ message: "Document succesfully deleted" });
  } catch (error) {
    next(error);
  }
};

// Updating Docs (reusable)
const updateDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Docs : Invalid fields");
    }
    const { docs_id, ...docsData } = matchedData(req);
    const { matchedCount, modifiedCount } = await AvailableDocs.updateOne(
      { docs_id },
      {
        $set: { docsData },
      }
    );
    if (matchedCount === 0 && modifiedCount === 0) {
      throw new Error("Docs deletion: Failed to delete the docs");
    }
    res.send(200).json({ message: "Document succesfully deleted" });
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
    if (!docs) {
      throw new Error("Docs deletion: Failed to delete the docs");
    }
    res.send(200).json({ message: "Document succesfully deleted", docs: docs });
  } catch (error) {
    next(error);
  }
};

export { requestDocs, createDocs, deleteDocs, updateDocs, retrieveAllDocs };
