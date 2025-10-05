import { body } from "express-validator";

const STATUS_ENUM = ["pending", "completed", "cancelled"];
const PAYMENT_STATUS_ENUM = ["paid", "refunded", "not paid"];
const CATEGORY_ENUM = [
  "Sports Athletic",
  "Beauty Pageants",
  "Entertainment",
  "Competitions",
  "Comunity Events",
  "Fiesta & Celebration",
];

const updateEventRequestValidation = [
  body("docs_id")
    .exists()
    .withMessage("Event request ID is required")
    .isMongoId()
    .withMessage("Event request ID must be a valid MongoDB ID"),
  body("eventTitle")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Event title cannot be empty"),
  body("category")
    .optional()
    .isString()
    .trim()
    .isIn(CATEGORY_ENUM)
    .withMessage(`Category must be one of: ${CATEGORY_ENUM.join(", ")}`),
  body("dateOfEvent")
    .optional()
    .isISO8601()
    .withMessage("Date of event must be a valid date")
    .toDate(),
  body("teamMemberParticipant")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Team/member/participant name cannot be empty"),
  body("specialRequirements")
    .optional()
    .isString()
    .trim()
    .withMessage("Special requirements must be a string"),
  body("contactNumber")
    .optional()
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Contact number must be a valid format"),
  body("status")
    .optional()
    .isString()
    .trim()
    .isIn(STATUS_ENUM)
    .withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`),
  body("paymentStatus")
    .optional()
    .isString()
    .trim()
    .isIn(PAYMENT_STATUS_ENUM)
    .withMessage(
      `Payment status must be one of: ${PAYMENT_STATUS_ENUM.join(", ")}`
    ),
  body("processingNotes")
    .optional()
    .isString()
    .trim()
    .withMessage("Processing notes must be a string"),
  body("payment")
    .optional()
    .isString()
    .trim()
    .withMessage("Payment details must be a string"),
  body().custom((value) => {
    const updateFields = [
      "eventTitle",
      "category",
      "dateOfEvent",
      "teamMemberParticipant",
      "specialRequirements",
      "contactNumber",
      "status",
      "paymentStatus",
      "processingNotes",
      "payment",
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

const createEventRequestValidation = [
  body("eventTitle")
    .exists()
    .withMessage("Event title is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Event title cannot be empty"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .isString()
    .trim()
    .isIn(CATEGORY_ENUM)
    .withMessage(`Category must be one of: ${CATEGORY_ENUM.join(", ")}`),
  body("dateOfEvent")
    .exists()
    .withMessage("Date of event is required")
    .isISO8601()
    .withMessage("Date of event must be a valid date")
    .toDate(),
  body("teamMemberParticipant")
    .exists()
    .withMessage("Team/member/participant name is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Team/member/participant name cannot be empty"),
  body("specialRequirements")
    .optional()
    .isString()
    .trim()
    .withMessage("Special requirements must be a string"),
  body("contactNumber")
    .exists()
    .withMessage("Contact number is required")
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Contact number must be a valid format"),
  body("status")
    .optional()
    .isString()
    .trim()
    .isIn(STATUS_ENUM)
    .default("pending")
    .withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`),
  body("paymentStatus")
    .optional()
    .isString()
    .trim()
    .isIn(PAYMENT_STATUS_ENUM)
    .default("not paid")
    .withMessage(
      `Payment status must be one of: ${PAYMENT_STATUS_ENUM.join(", ")}`
    ),
  body("processingNotes")
    .optional()
    .isString()
    .trim()
    .withMessage("Processing notes must be a string"),
  body("payment")
    .optional()
    .isString()
    .trim()
    .withMessage("Payment details must be a string"),
];

const deleteEventRequestValidation = [
  body("event_id")
    .exists()
    .withMessage("Event request ID is required for deletion")
    .isMongoId()
    .withMessage("Event request ID must be a valid MongoDB ID"),
];

export {
  updateEventRequestValidation,
  createEventRequestValidation,
  deleteEventRequestValidation,
};
