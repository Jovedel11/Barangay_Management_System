import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import NotifModel from "@/models/notification";

const createNotif = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid fields" });
    }
    const body = matchedData(req);
    const result = await NotifModel.create(body);
    result.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    next(error);
  }
};

const getNotif = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Check the User ID type or if it's not missing" });
    }

    const { user_id } = matchedData(req);
    const [notifs, notifCount] = await Promise.all([
      NotifModel.find({ user: user_id }).sort({ createdAt: -1 }),
      NotifModel.countDocuments({ user: user_id, isSeen: false }),
    ]);
    if (!notifs || notifs.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json({ notifCount, notifs });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    next(error);
  }
};

const deleteNotif = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Check the User ID type or if it's not missing" });
    }

    const { user_id } = matchedData(req);

    const deleted = await NotifModel.deleteOne({ user_id });

    if (deleted.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found to delete" });
    }

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.error("Error deleting notifications:", error);
    next(error);
  }
};

export { getNotif, deleteNotif, createNotif };
