import ProccessNotif from "@/lib/process.notif";
import { BrgyEvent } from "@/models/brgy.events";
import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import type { Model } from "mongoose";

type Create = {
  model: Model<any>;
  sendNotif?: boolean;
};

const createEvents = ({
  model: CollectionModel,
  sendNotif = false,
}: Create) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = matchedData(req);
      const event = await CollectionModel.create({ ...data });
      event.save();
      console.log("Dataaaaaa ", data);
      if (sendNotif) {
        const result = await ProccessNotif({
          resident_id: data.user,
          data_name: data.eventTitle,
          data_category: data.category,
          details: "has booked an event service",
          link: "/admin/manage-events",
        });
        if (!result?.success) throw new Error("Error in processing notif");
      }
      return res.status(201).json({
        message: "Event successfully created",
      });
    } catch (error) {
      console.log("Error in creating event :", error);
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
        throw new Error("Event controller: Invalid fields");
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

const getFeaturedEvent = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BrgyEvent.find({ featuredEvent: true });
    if (!result) {
      return res.status(404).json({ message: "Error finding featured event" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createEvents, deleteEvents, getFeaturedEvent };
