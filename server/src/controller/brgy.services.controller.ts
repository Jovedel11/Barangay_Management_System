import BrgyService from "@/models/brgy.services";
import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";

const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = matchedData(req);
    const availabDocs = await BrgyService.create({ ...data });
    availabDocs.save();
    return res.status(201).json({
      message: "Document successfully created",
    });
  } catch (error) {
    console.log("Error in create docs:", error);
    next(error);
  }
};

const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const { service_id } = matchedData(req);
    const { deletedCount } = await BrgyService.deleteOne({
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

export { createService, deleteService };
