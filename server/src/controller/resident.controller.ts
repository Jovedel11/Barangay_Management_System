import { AccountModel } from "@/models/user.model";
import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";

const createResidents = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = matchedData(req);
      const resident = await CollectionModel.create({ ...data });
      resident.save();
      return res.status(201).json({
        message: "Resident successfully created",
      });
    } catch (error) {
      console.log("Error in creating event :", error);
      next(error);
    }
  };
};

const deleteResidents = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Resident controller: Invalid fields");
      }
      const { resident_id } = matchedData(req);
      const { deletedCount } = await CollectionModel.deleteOne({
        _id: resident_id,
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Resident not found" });
      }
      return res.status(200).json({ message: "Resident successfully deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id } = matchedData(req);
    const resident = await AccountModel.findById({ _id: user_id });
    return res.status(201).json([resident]);
  } catch (error) {
    console.log("Error in creating event :", error);
    next(error);
  }
};

export { createResidents, deleteResidents, getProfile };
