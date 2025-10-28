import {
  handleValidationErrors,
  createResidentValidation,
  updateResidentValidation,
  deleteResidentValidation,
  processAccountValidation,
} from "@/middleware/brgy.resident.middleware";
import { createService } from "@/controller/brgy.services.controller";
import { createSearchController } from "@/controller/booking.item.controller";
import { Router } from "express";
import searchItemValidation from "@/middleware/search.middleware";
import { updateDocs } from "@/controller/brgy.docs.controller";
import { BrgyResident } from "@/models/brgy.resident";
import { AccountModel } from "@/models/user.model";
import {
  deleteResidents,
  getProfile,
  updateAccount,
} from "@/controller/resident.controller";
import { updateAccountValidation } from "@/middleware/account.update.middleware";
import { query } from "express-validator";
const router = Router();

const retrieveSystemResident = createSearchController(BrgyResident, [
  "firstName",
  "lastName",
  "dateOfBirth",
  "gender",
  "civilStatus",
  "completeAddress",
  "phoneNumber",
  "email",
  "emergencyContact",
  "emergencyPhone",
  "occupation",
  "familyMember",
]);

const retrieveSystemUser = createSearchController(AccountModel, ["role"]);

router.get(
  "/profile",
  query("user_id").isMongoId().withMessage("Invalid user ID"),
  getProfile
);
router.get(
  "/system-resident/retrieve",
  searchItemValidation,
  retrieveSystemResident
); // Retrieve (admin)
router.get("/system-user/retrieve", searchItemValidation, retrieveSystemUser); // Retrieve (resident)
router.put(
  "/update/system-resident",
  updateResidentValidation,
  handleValidationErrors,
  updateDocs({ model: BrgyResident })
);
router.put(
  "/update/account",
  updateAccountValidation,
  handleValidationErrors,
  updateDocs({ model: AccountModel })
);
router.put(
  "/update/system-user",
  processAccountValidation,
  handleValidationErrors,
  updateAccount({ model: AccountModel })
);
router.post(
  "/insert/system-resident",
  createResidentValidation,
  handleValidationErrors,
  createService({ model: BrgyResident })
); // Create new resident
router.delete(
  "/delete/system-resident",
  deleteResidentValidation,
  handleValidationErrors,
  deleteResidents({ model: BrgyResident })
); // Delete resident
export default router;
