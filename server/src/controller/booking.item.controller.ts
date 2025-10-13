import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  BorrowRequestModel,
  BorrowableItemsModel,
} from "@/models/borrow.items";
import FilterCollection from "@/lib/search.data";
import type { Model } from "mongoose";
import NotifModel from "@/models/notification";
import { sendNotification } from "@/config/socket.connection";
import { io } from "@/App";
import { AccountModel } from "@/models/user.model";

// For Resident for passing booking form
const bookItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const item = matchedData(req);
    const bookItem = await BorrowRequestModel.create({ ...item }); //for admin (book item)
    bookItem.save();
    const admin = await AccountModel.findOne({ role: "admin" }).select("_id");
    const resident = await AccountModel.findOne(
      { _id: item.user },
      { first_name: 1, last_name: 1 }
    );
    console.log("Title :", item);
    if (!admin || !resident) throw new Error("No admin and User found");
    const notifDocs = {
      user: admin._id,
      title: item.name,
      category: item.category,
      details: `${resident.first_name} ${resident.last_name} has requested an item`,
      link: "/admin/manage-items",
    };
    await NotifModel.insertMany(notifDocs);

    console.log(
      "Notification saved to database, sending socket notification..."
    );
    console.log("User ID here: ", typeof (admin._id as string).toString());
    sendNotification(io, (admin._id as string).toString(), true);
    console.log("Socket notification sent");
    return res.status(201).json({ message: "Item booked successfully!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// For Admin only
const addAvailableBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const item = matchedData(req);
    const availableItem = await BorrowableItemsModel.create({ ...item }); //for admin (available item)
    availableItem.save();
    return res
      .status(201)
      .json({ message: "Items added! They're ready for booking." });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Retrieving availabe booking
const getAvailableBooking = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const availableItem = await BorrowableItemsModel.find(); //for admin (available item)
    if (!availableItem) {
      return res.status(404).json({ message: "No available items found" });
    }
    return res.status(200).json(availableItem);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Reusable for admin and resident
const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const { item_id, ...updateData } = matchedData(req);
    const { matchedCount, modifiedCount } =
      await BorrowableItemsModel.updateOne(
        { item_id },
        {
          $set: { ...updateData },
        }
      );
    if (matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (modifiedCount === 0) {
      return res.status(400).json({ message: "No changes made" });
    }
    return res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Users can delete their request by marking as returned, etc.
// It must be deleted from their bookings
const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const { item_id } = matchedData(req);
    const { deletedCount } = await BorrowableItemsModel.deleteOne({
      _id: item_id,
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

// Search specific item (reusable)
const createSearchController = (
  CollectionModel: Model<any>,
  fieldsToSearch: string[],
  value: boolean = false
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid fields",
          errors: errors.array(),
        });
      }
      const { search, category, status, userID } = matchedData(req, {
        locations: ["query"],
      });
      console.log("Collection Model: ", CollectionModel);
      console.log("Has user: ", value);
      console.log("User ID: ", userID);
      const result = await FilterCollection({
        search,
        category,
        status,
        model: CollectionModel,
        hasUser: value,
        data: fieldsToSearch,
        userID,
      });
      if (result?.error) throw result.error;
      if (result?.notFound) {
        return res.status(404).json({ message: "Data not found" });
      }
      return res.status(200).json(result.filteredData);
    } catch (error) {
      console.error("Search controller error:", error);
      next(error);
    }
  };
};

export {
  bookItem,
  addAvailableBooking,
  getAvailableBooking,
  updateItem,
  deleteItem,
  createSearchController,
};
