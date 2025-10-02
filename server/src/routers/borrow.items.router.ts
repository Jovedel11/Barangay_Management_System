import {
  itemBorrowValidation,
  borrowableItemValidation,
  updateItemValidation,
  updateBorrowRequestValidation,
  deleteItemValidation,
} from "@/middleware/borrow.item.middleware";
import {
  bookItem,
  addAvailableBooking,
  deleteItem,
  createSearchController,
} from "@/controller/booking.item.controller";
import { Router } from "express";
import {
  BorrowableItemsModel,
  BorrowRequestModel,
} from "@/models/borrow.items";
import searchItemValidation from "@/middleware/search.middleware";
import { updateDocs } from "@/controller/brgy.docs.controller";
const router = Router();

// Search controller for searching specific data (reusable)
const retreiveAllItems = createSearchController(BorrowableItemsModel, [
  "name",
  "category",
  "description",
  "total",
  "condition",
  "borrowingFee",
  "maxBorrowDays",
  "requirements",
  "notes",
]);

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
  ],
  true
);

router.get("/request/items", searchItemValidation, retreieveItemRequests); // Retrieve (resident)
router.get("/available/items", searchItemValidation, retreiveAllItems); // Retrieve all
router.put(
  "/update/available",
  updateItemValidation,
  updateDocs({ model: BorrowableItemsModel })
); // Update (reusable)
router.put(
  "/update/item-request",
  updateBorrowRequestValidation,
  updateDocs({ model: BorrowRequestModel })
);
router.delete("/delete", deleteItemValidation, deleteItem); // Delete (reusable)
router.post("/insert", itemBorrowValidation, bookItem); // Insert for booking request
router.post("/available/insert", borrowableItemValidation, addAvailableBooking); // Insert for available items

export default router;
