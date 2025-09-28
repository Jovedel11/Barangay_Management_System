import {
  requestDocsValidation,
  availableDocsValidation,
  updateDocsValidation,
  deleteDocsValidation,
} from "@/middleware/docs.middleware";
import {
  requestDocs,
  createDocs,
  deleteDocs,
  updateDocs,
  retrieveAllDocs,
} from "@/controller/brgy.docs.controller";
import { createSearchController } from "@/controller/booking.item.controller";
import { Router } from "express";
import { BorrowableItemsModel } from "@/models/borrow.items";
import searchItemValidation from "@/middleware/search.middleware";
const router = Router();

// Search controller for searching specific data (reusable)
const searchData = createSearchController(BorrowableItemsModel, [
  "name",
  "category",
  "description",
  "fee",
  "processingTime",
  "requirements",
  "purposes",
  "deliveryAvailable",
  "urgent",
  "urgentFee",
  "urgentTime",
]);

router.get("/retrieve", retrieveAllDocs); // Retrieve all docs created by the admin (resident)
router.get("/search", searchItemValidation, searchData); // Search available docs
router.put("/update", updateDocs, updateDocsValidation); // Update request docs (reusable)
router.delete("/delete", deleteDocsValidation, deleteDocs); // Delete docs in admin or req docs  (reusable)
router.post("/request", requestDocsValidation, requestDocs); // Insert a form for docs request
router.post("/availabe/insert", availableDocsValidation, createDocs); // Insert available docs (admin)

export default router;
