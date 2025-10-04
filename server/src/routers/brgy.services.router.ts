import {
  updateServiceValidation,
  createServiceValidation,
  handleValidationErrors,
  deleteServiceValidation,
  serviceRequestValidation,
} from "@/middleware/brgy.services.middleware";
import { BrgyService, ServiceRequest } from "@/models/brgy.services";
import {
  createService,
  deleteService,
} from "@/controller/brgy.services.controller";
import { createSearchController } from "@/controller/booking.item.controller";
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

const retrieveServiceRequest = createSearchController(
  ServiceRequest,
  ["service", "category", "status", "details"],
  true
);

router.get("/available/services", searchItemValidation, retrieveAllServices); // Retrieve (admin)
router.get("/request/services", searchItemValidation, retrieveServiceRequest); // Retrieve (resident)
router.put(
  "/update/available",
  updateServiceValidation,
  updateDocs({ model: BrgyService })
); // Update (availablle)
router.put(
  "/update/request",
  updateServiceValidation,
  updateDocs({ model: ServiceRequest })
); // Update (request)
router.post(
  "/insert/available",
  createServiceValidation,
  handleValidationErrors,
  createService({ model: BrgyService })
); // Insert for available service
router.post(
  "/insert/request",
  serviceRequestValidation,
  createService({ model: ServiceRequest })
);
router.delete(
  "/delete/available",
  deleteServiceValidation,
  deleteService({ model: BrgyService })
);

router.delete(
  "/delete/request",
  deleteServiceValidation,
  deleteService({ model: ServiceRequest })
);
export default router;
