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
} from "@/controller/brgy.docs.controller";
import { createSearchController } from "@/controller/booking.item.controller";
import { Router } from "express";
import { AvailableDocs, DocsModel } from "@/models/documents.model";
import searchItemValidation from "@/middleware/search.middleware";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Search controller for searching specific data (reusable)
const searchData = createSearchController(AvailableDocs, [
  "name",
  "category",
  "description",
  "fee",
  "processingTime",
  "requirements",
  "purposes",
  "urgentFee",
  "urgentTime",
  "specialNote",
]);

const getRequestDocs = createSearchController(
  DocsModel,
  [
    "user",
    "purpose",
    "deliveryMethod",
    "contactNumber",
    "specificDetails",
    "status",
  ],
  true
);

router.get("/get-request", searchItemValidation, getRequestDocs); // Retrieve all request docs
router.get("/get-available", searchItemValidation, searchData); // Search available docs
router.put(
  "/update/available",
  updateDocsValidation,
  updateDocs({ model: AvailableDocs })
); // Update availablde docs (admin)
router.put(
  "/update/request",
  upload.single("file"),
  updateDocsValidation,
  updateDocs({
    model: DocsModel,
    sendNotif: true,
    detailsToSend: "has processed your documents",
    linkToSend: "/resident/barangay-documents",
    isDocs: true,
  })
); // Update request docs (resident)
router.delete(
  "/delete/available",
  deleteDocsValidation,
  deleteDocs({ model: AvailableDocs })
); // Delete docs in admin
router.delete(
  "/delete/request",
  deleteDocsValidation,
  deleteDocs({ model: DocsModel })
); // Resident
router.post(
  "/request",
  upload.single("paymentImg"),
  requestDocsValidation,
  requestDocs
); // Insert a form for docs request
router.post("/available/insert", availableDocsValidation, createDocs); // Insert available docs (admin)

export default router;
