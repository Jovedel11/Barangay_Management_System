// routes/borrow.items.ts

import {
  itemBorrowValidation,
  borrowableItemValidation,
  updateItemValidation,
  updateBorrowRequestValidation,
  deleteItemValidation,
} from "@/middleware/borrow.item.middleware";
import {
  createBorrowRequest, // ✅ Updated version with availability check
  addAvailableBooking,
  deleteItem,
  createSearchController,
  getSpecificItem,
  checkAvailability, // ✅ NEW: For real-time availability checking
  getAllBorrowRequests, // ✅ NEW: Enhanced admin view with availability
} from "@/controller/booking.item.controller";
import { Router } from "express";
import {
  BorrowableItemsModel,
  BorrowRequestModel,
} from "@/models/borrow.items";
import searchItemValidation from "@/middleware/search.middleware";
import { updateDocs } from "@/controller/brgy.docs.controller";
import { query, body } from "express-validator";

const router = Router();

// ============================================
// RESIDENT ROUTES
// ============================================

const retreieveItemRequests = createSearchController(
  BorrowRequestModel,
  [
    "user",
    "quantity",
    "borrowDate",
    "returnDate",
    "purpose",
    "eventLocation",
    "contactNumber",
    "deliveryMethod",
    "status",
    "category",
  ],
  true
);

router.get(
  "/request/resident/items",
  searchItemValidation,
  retreieveItemRequests
);

/**
 * Create a borrow request
 * Now includes date-based availability checking
 */
router.post(
  "/request/insert",
  itemBorrowValidation, // Your existing validation
  createBorrowRequest // ✅ Updated controller with availability check
);

/**
 * Check item availability for specific dates (real-time)
 * Used by frontend when resident selects dates
 */
router.post(
  "/items/:item_id/check-availability",
  [
    query("item_id").isMongoId().withMessage("Invalid item ID"),
    body("borrowDate").isISO8601().withMessage("Invalid borrow date"),
    body("returnDate").isISO8601().withMessage("Invalid return date"),
  ],
  checkAvailability // ✅ NEW controller
);

/**
 * Get specific item details
 */
router.get(
  "/request/specific/item",
  query("item_id")
    .isMongoId()
    .withMessage("Invalid item id")
    .notEmpty()
    .withMessage("Item id is required"),
  getSpecificItem
);

// ============================================
// ADMIN ROUTES
// ============================================

/**
 * Get all borrow requests with availability info
 * ✅ NEW: Enhanced version that shows availability and conflicts
 */
router.get(
  "/request/items",
  searchItemValidation,
  getAllBorrowRequests // ✅ NEW: Replaces retreieveItemRequests
);

/**
 * Get all available items (for inventory management)
 */
router.get(
  "/available/items",
  searchItemValidation,
  createSearchController(BorrowableItemsModel, [
    "category",
    "description",
    "total",
    "condition",
    "borrowingFee",
    "maxBorrowDays",
    "requirements",
    "notes",
  ])
);

/**
 * Update available item details (inventory management)
 */
router.put(
  "/update/available",
  updateItemValidation,
  updateDocs({ model: BorrowableItemsModel })
);

/**
 * Update borrow request status (approve/reject/etc)
 * ✅ Updated to check availability before approving
 */
router.put(
  "/update/item-request",
  updateBorrowRequestValidation,
  updateDocs({
    model: BorrowRequestModel,
    sendNotif: true,
    detailsToSend: "has processed your item request",
    linkToSend: "/resident/manage-borrow-items",
    isItem: true, // ✅ This triggers availability check in updateDocs
  })
);

/**
 * Mark item as returned
 * Status changes to "returned" (no longer blocks availability)
 */
router.put(
  "/mark-as-returned",
  updateBorrowRequestValidation,
  updateDocs({
    model: BorrowRequestModel,
    sendNotif: true,
    detailsToSend: "has returned an item",
    linkToSend: "/admin/manage-items",
    isItem: true,
    sendToResident: false,
  })
);

/**
 * Delete a borrow request
 */
router.delete("/delete", deleteItemValidation, deleteItem);

/**
 * Add new borrowable item to inventory
 */
router.post("/available/insert", borrowableItemValidation, addAvailableBooking);

export default router;
