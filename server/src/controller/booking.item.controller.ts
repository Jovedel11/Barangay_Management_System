import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  BorrowRequestModel,
  BorrowableItemsModel,
} from "@/models/borrow.items";
import FilterCollection from "@/lib/search.data";
import type { Model } from "mongoose";

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
    res.send(200).json({ message: "Item booked successfully!" });
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
    res.send(200).json({ message: "Items added! They're ready for booking." });
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
    if (!availableItem) throw new Error();
    res.send(200).json({ ...availableItem });
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
    if (matchedCount === 0 && modifiedCount === 0) throw new Error();
    res.send(200).json({ message: "Update successful" });
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
    const { deletedCount } = await BorrowableItemsModel.deleteOne({ item_id });
    if (deletedCount === 0) throw new Error();
    res.send(200).json({ message: "Booking request successfully updated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Search specific item (reusable)
const createSearchController = (
  CollectionModel: Model<any>,
  fieldsToSearch: string[]
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
      const { search, category } = matchedData(req, {
        locations: ["query"],
      });
      console.log(search, category);
      const result = await FilterCollection({
        search,
        category,
        model: CollectionModel,
        data: fieldsToSearch,
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
