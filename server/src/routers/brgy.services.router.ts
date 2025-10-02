import {
  updateServiceValidation,
  createServiceValidation,
  handleValidationErrors,
} from "@/middleware/brgy.services.middleware";
import BrgyService from "@/models/brgy.services";
import { createService } from "@/controller/brgy.services.controller";
import {
  deleteItem,
  createSearchController,
} from "@/controller/booking.item.controller";
import { Router } from "express";
import searchItemValidation from "@/middleware/search.middleware";
import { updateDocs } from "@/controller/brgy.docs.controller";
const router = Router();

// Search controller for searching specific data (reusable)
const retrieveAllServices = createSearchController(BrgyService, [
  "name",
  "category",
  "description",
  "schedule",
  "time",
  "location",
  "cost",
  "requirements",
  "serviceType",
  "slots",
  "contact",
  "phone",
  "details",
]);

router.get("/available/services", searchItemValidation, retrieveAllServices); // Retrieve (resident)
router.put(
  "/update/available",
  updateServiceValidation,
  updateDocs({ model: BrgyService })
); // Update (reusable)
router.post(
  "/available/insert",
  createServiceValidation,
  handleValidationErrors,
  createService
); // Insert for available service
router.delete("/delete", deleteItem);

export default router;
