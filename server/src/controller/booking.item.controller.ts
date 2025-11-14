import type { Request, Response, NextFunction } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  BorrowRequestModel,
  BorrowableItemsModel,
} from "@/models/borrow.items";
import FilterCollection from "@/lib/search.data";
import { Types, type Model } from "mongoose";
import ProccessNotif from "@/lib/process.notif";
import {
  getAvailableQuantity,
  getConflictingRequests,
  getItemAvailabilityInfo,
} from "@/lib/check.availability";

/* I will use session here from mongoose
 * its purpose is to uncocommit the transactions if one of them fails
 * It is useful when dealing multiple transaction
 */

// For Resident for passing booking form
const createBorrowRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: errors.array(),
      });
    }

    const item = matchedData(req);

    // ✅ Validate dates
    const borrowDate = new Date(item.borrowDate);
    const returnDate = new Date(item.returnDate);

    if (borrowDate >= returnDate) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after borrow date",
      });
    }

    // Prevent booking in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (borrowDate < today) {
      return res.status(400).json({
        success: false,
        message: "Cannot book items for past dates",
      });
    }

    // ✅ Check availability for the requested dates
    const available = await getAvailableQuantity({
      itemId: item.main_item,
      startDate: borrowDate,
      endDate: returnDate,
    });

    if (item.quantity > available) {
      return res.status(400).json({
        success: false,
        message: `Only ${available} unit(s) available for the selected dates`,
        available,
      });
    }

    // ✅ Create the borrow request with "pending" status
    const borrowRequest = await BorrowRequestModel.create({
      ...item,
      status: "pending", // Important: starts as pending
    });

    console.log("Borrow request created:", borrowRequest._id);

    // ✅ Send notification
    const result = await ProccessNotif({
      resident_id: item.user,
      data_name: item.category,
      data_category: item.category,
      details: "has requested an item",
      link: "/admin/manage-items",
    });

    if (!result?.success) {
      console.error("Notification failed, but request was created");
    }

    return res.status(201).json({
      success: true,
      message: "Item booking request submitted successfully!",
      data: borrowRequest,
    });
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

const getSpecificItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Book item: Invalid fields");
    }
    const { item_id } = matchedData(req);
    console.log("Item ID", item_id);
    const item = await BorrowRequestModel.findOne({ _id: item_id }).populate(
      "main_item"
    );
    console.log("Item found :", item);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
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

const checkAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: errors.array(),
      });
    }

    const { item_id } = req.params;
    const { borrowDate, returnDate } = req.body;

    if (!borrowDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Both borrowDate and returnDate are required",
      });
    }

    const borrow = new Date(borrowDate);
    const return_ = new Date(returnDate);

    if (borrow >= return_) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after borrow date",
      });
    }

    const info = await getItemAvailabilityInfo(item_id, borrow, return_);

    // Optional: Get conflicting bookings for transparency
    const conflicts = await getConflictingRequests(item_id, borrow, return_);

    return res.status(200).json({
      success: true,
      data: {
        ...info,
        conflicts: conflicts.map((req) => ({
          user: req.user,
          quantity: req.quantity,
          borrowDate: req.borrowDate,
          returnDate: req.returnDate,
          status: req.status,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

// controllers/borrowItemController.ts

/**
 * Get all borrow requests with availability info (Admin view)
 */
export const getAllBorrowRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: errors.array(),
      });
    }

    const { search, category, status, userID } = matchedData(req, {
      locations: ["query"],
    });

    // Build aggregation pipeline
    const pipeline: any[] = [
      // Join with user data
      {
        $lookup: {
          from: "accounts",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Join with item data
      {
        $lookup: {
          from: "availableitems", // Make sure this matches your actual collection name
          localField: "main_item",
          foreignField: "_id",
          as: "itemData",
        },
      },
      {
        $unwind: {
          path: "$itemData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Format the output - FIXED: Keep itemData accessible
      {
        $addFields: {
          user: {
            _id: "$userData._id",
            email: "$userData.email",
            firstName: "$userData.first_name",
            lastName: "$userData.last_name",
          },
          item: {
            _id: "$itemData._id",
            category: "$itemData.category",
            total: "$itemData.total",
          },
        },
      },
      // Don't remove itemData yet, we need it for availability calculation
    ];

    // Build match conditions
    const matchStage: any = {};

    // Search filter
    if (search?.trim()) {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      matchStage.$or = [
        { category: searchRegex },
        { purpose: searchRegex },
        { eventLocation: searchRegex },
        { "userData.first_name": searchRegex },
        { "userData.last_name": searchRegex },
        { "userData.email": searchRegex },
      ];
    }

    // Category filter
    if (category && category.trim() !== "" && category !== "All Categories") {
      matchStage.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Status filter
    if (status && status.trim() !== "") {
      matchStage.status = { $regex: `^${status}$`, $options: "i" };
    }

    // User filter
    if (userID && Types.ObjectId.isValid(userID)) {
      matchStage.user = new Types.ObjectId(userID);
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Sort by date (newest first)
    pipeline.push({ $sort: { createdAt: -1 } });

    // Clean up the output
    pipeline.push({
      $project: {
        userData: 0,
        itemData: 0,
      },
    });

    const requests = await BorrowRequestModel.aggregate(pipeline);

    // ✅ Enhance each request with availability info
    const enhancedRequests = await Promise.all(
      requests.map(async (request) => {
        try {
          // Verify item exists and has total
          if (!request.item || typeof request.item.total !== 'number') {
            console.error(`Invalid item data for request ${request._id}`, request.item);
            return {
              ...request,
              availabilityInfo: {
                total: 0,
                available: 0,
                reserved: 0,
                canApprove: false,
                conflicts: [],
                error: "Item data not found",
              },
            };
          }

          // Calculate current availability for this request's dates
          const availability = await getAvailableQuantity({
            itemId: request.main_item.toString(),
            startDate: new Date(request.borrowDate),
            endDate: new Date(request.returnDate),
            excludeRequestId: request._id.toString(), // Don't count itself
          });

          // Get conflicting approved requests
          const conflicts = await getConflictingRequests(
            request.main_item.toString(),
            new Date(request.borrowDate),
            new Date(request.returnDate)
          );

          // Determine if this request can be approved
          const canApprove =
            request.status === "pending" && request.quantity <= availability;

          return {
            ...request,
            availabilityInfo: {
              total: request.item.total,
              available: availability,
              reserved: request.item.total - availability,
              canApprove,
              conflicts: conflicts
                .filter((c) => c._id.toString() !== request._id.toString())
                .map((c) => ({
                  user: c.user,
                  quantity: c.quantity,
                  borrowDate: c.borrowDate,
                  returnDate: c.returnDate,
                })),
            },
          };
        } catch (error) {
          console.error(
            `Error calculating availability for request ${request._id}:`,
            error
          );
          return {
            ...request,
            availabilityInfo: {
              total: request.item?.total || 0,
              available: 0,
              reserved: request.item?.total || 0,
              canApprove: false,
              conflicts: [],
              error: "Failed to calculate availability",
            },
          };
        }
      })
    );

    if (!enhancedRequests || enhancedRequests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No requests found",
      });
    }

    return res.status(200).json({
      success: true,
      data: enhancedRequests,
    });
  } catch (error) {
    console.error("Get borrow requests error:", error);
    next(error);
  }
};

export {
  createBorrowRequest,
  getSpecificItem,
  checkAvailability,
  addAvailableBooking,
  getAvailableBooking,
  updateItem,
  deleteItem,
  createSearchController,
};
