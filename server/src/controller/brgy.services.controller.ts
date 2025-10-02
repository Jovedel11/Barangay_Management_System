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


export { createService };
