import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";

const createEvents = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = matchedData(req);
      const event = await CollectionModel.create({ ...data });
      event.save();
      return res.status(201).json({
        message: "Event successfully created",
      });
    } catch (error) {
      console.log("Error in create docs:", error);
      next(error);
    }
  };
};

const deleteEvents = ({
  model: CollectionModel,
}: Record<string, Model<any>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Book item: Invalid fields");
      }
      const { event_id } = matchedData(req);
      const { deletedCount } = await CollectionModel.deleteOne({
        _id: event_id,
      });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Event not found" });
      }
      return res.status(200).json({ message: "Event successfully deleted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

export { createEvents, deleteEvents };
