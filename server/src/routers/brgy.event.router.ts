import {
  handleValidationErrors,
} from "@/middleware/brgy.services.middleware";
import { createService } from "@/controller/brgy.services.controller";
import { createSearchController } from "@/controller/booking.item.controller";
import { Router } from "express";
import searchItemValidation from "@/middleware/search.middleware";
import { updateDocs } from "@/controller/brgy.docs.controller";
import { BrgyEvent } from "@/models/brgy.events";
import { deleteEvents } from "@/controller/events.controller";
import { createEventValidation, deleteEventValidation, updateEventValidation } from "@/middleware/brgy.events.middleware";
const router = Router();

// Search controller for searching specific data (reusable)
const retrieveAllEvents = createSearchController(BrgyEvent, [
  "eventTitle",
  "category",
  "description",
  "time",
  "venue",
  "organizer",
  "contactPerson",
  "phoneNumber",
  "participants",
  "status",
  "prizesAwards",
  "requirements",
  "activities",
  "categories",
  "featuredEvent",
]);

router.get("/available/retrieve", searchItemValidation, retrieveAllEvents); // Retrieve (admin)
//router.get("/request/services", searchItemValidation, retrieveServiceRequest); // Retrieve (resident)
router.put(
  "/update/available",
  updateEventValidation,
  updateDocs({ model: BrgyEvent })
); // Update event
router.post(
  "/insert/available",
  createEventValidation,
  handleValidationErrors,
  createService({ model: BrgyEvent })
); // Create new event
router.delete(
  "/delete/available",
  deleteEventValidation ,
  deleteEvents({ model: BrgyEvent })
); // Delete event
export default router;
