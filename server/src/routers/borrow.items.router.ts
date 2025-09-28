import {
  itemBorrowValidation,
  borrowableItemValidation,
  updateItemValidation,
  deleteItemValidation,
} from "@/middleware/borrow.item.middleware";
import {
  bookItem,
  addAvailableBooking,
  getAvailableBooking,
  updateItem,
  deleteItem,
  createSearchController,
} from "@/controller/booking.item.controller";
import { Router } from "express";
import { BorrowableItemsModel } from "@/models/borrow.items";
import searchItemValidation from "@/middleware/search.middleware";
const router = Router();

// Search controller for searching specific data (reusable)
const searchData = createSearchController(BorrowableItemsModel, [
  "name",
  "category",
  "description",
  "available",
  "total",
  "condition",
  "borrowingFee",
  "maxBorrowDays",
  "deliveryAvailable",
  "requirements",
  "notes",
]);

router.get("/retrieve", getAvailableBooking); // Retrieve (resident)
router.get("/search", searchItemValidation, searchData); // Search
router.post("/update", updateItemValidation, updateItem); // Update (reusable)
router.post("/delete", deleteItemValidation, deleteItem); // Delete (reusable)
router.post("/insert", itemBorrowValidation, bookItem); // Insert for booking request
router.post("/availabe/insert", borrowableItemValidation, addAvailableBooking); // Insert for available items

export default router;
