import {
  body,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

const STATUS_ENUM: string[] = [
  "confirmed",
  "pending",
  "completed",
  "rescheduled",
];

export const serviceRequestValidation: ValidationChain[] = [
  body("user")
    .exists({ checkFalsy: true })
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectId"),
  body("service")
    .isString()
    .withMessage("Service must be a string")
    .notEmpty()
    .withMessage("Service field cannot be empty"),
  body("category")
    .isString()
    .withMessage("Category must be a string")
    .notEmpty()
    .withMessage("Category field cannot be empty"),
  body("status")
    .isString()
    .withMessage("Status must be a string")
    .notEmpty()
    .withMessage("Status field cannot be empty")
    .isIn(STATUS_ENUM)
    .withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`),
  body("details")
    .isString()
    .withMessage("Details must be a string")
    .notEmpty()
    .withMessage("Details field cannot be empty"),
];

const updateServiceValidation = [
  body("docs_id")
    .exists()
    .withMessage("Service ID is required")
    .isMongoId()
    .withMessage("Service ID must be a valid MongoDB ID"),
  body("name")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("category")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("description")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("schedule")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Schedule cannot be empty"),
  body("time")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Time cannot be empty"),
  body("location")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),
  body("cost")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Cost cannot be empty"),
  body("requirements")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Requirements cannot be empty"),
  body("serviceType")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Service type cannot be empty"),
  body("status")
    .optional()
    .custom((value) => {
      if (typeof value === "boolean") {
        return true;
      }
      if (typeof value === "string") {
        const allowed = ["confirmed", "pending", "completed", "rescheduled"];
        if (allowed.includes(value.toLowerCase())) {
          return true;
        }
      }
      throw new Error(
        "Status must be a string or one of: pending, processing, completed, rejected, rescheduled"
      );
    }),
  body("slots")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Slots cannot be empty"),
  body("contact")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Contact cannot be empty"),
  body("phone")
    .optional()
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Phone must be a valid phone number format"),
  body("details")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Details cannot be empty"),
  body("specialNote")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Special note cannot be empty"),
  body().custom((value) => {
    const updateFields = [
      "name",
      "category",
      "description",
      "schedule",
      "time",
      "location",
      "cost",
      "requirements",
      "serviceType",
      "status",
      "slots",
      "contact",
      "phone",
      "details",
      "specialNote",
    ];
    const hasUpdateField = updateFields.some(
      (field) => value[field] !== undefined
    );
    if (!hasUpdateField) {
      throw new Error("At least one field must be provided to update");
    }
    return true;
  }),
];

const createServiceValidation = [
  body("name")
    .exists()
    .withMessage("Service name is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("schedule")
    .exists()
    .withMessage("Schedule is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Schedule cannot be empty"),
  body("time")
    .exists()
    .withMessage("Time is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Time cannot be empty"),
  body("location")
    .exists()
    .withMessage("Location is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),
  body("cost")
    .exists()
    .withMessage("Cost is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Cost cannot be empty"),
  body("requirements")
    .exists()
    .withMessage("Requirements are required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Requirements cannot be empty"),
  body("serviceType")
    .exists()
    .withMessage("Service type is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Service type cannot be empty"),
  body("status")
    .exists()
    .withMessage("Status is required")
    .isBoolean()
    .withMessage("Status must be a boolean"),
  body("slots")
    .exists()
    .withMessage("Slots are required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Slots cannot be empty"),
  body("contact")
    .exists()
    .withMessage("Contact is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Contact cannot be empty"),
  body("phone")
    .exists()
    .withMessage("Phone is required")
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Phone must be a valid phone number format"),
  body("details")
    .exists()
    .withMessage("Details are required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Details cannot be empty"),
];

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Error in adding services");
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const deleteServiceValidation = [
  body("service_id")
    .exists()
    .withMessage("Service ID is required for deletion")
    .isMongoId()
    .withMessage("Service ID must be a valid MongoDB ID"),
];

export {
  updateServiceValidation,
  createServiceValidation,
  handleValidationErrors,
  deleteServiceValidation,
};
