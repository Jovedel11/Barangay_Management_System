import { body } from "express-validator";

const CATEGORY_ENUM = [
  "Sports Athletic",
  "Beauty Pageants",
  "Entertainment",
  "Competitions",
  "Comunity Events",
  "Fiesta & Celebration",
];

const STATUS_ENUM = [
  "upcoming",
  "ongoing",
  "completed",
  "cancelled",
  "postponed",
];

const updateEventValidation = [
  body("docs_id")
    .exists()
    .withMessage("Event ID is required")
    .isMongoId()
    .withMessage("Event ID must be a valid MongoDB ID"),
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
    .notEmpty()
    .isIn(CATEGORY_ENUM)
    .withMessage(`Category must be one of: ${CATEGORY_ENUM.join(", ")}`),
  body("description")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date")
    .custom((value, { req }) => {
      if (req.body.endDate && new Date(value) > new Date(req.body.endDate)) {
        throw new Error("Start date must be before end date");
      }
      return true;
    }),
  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (
        req.body.startDate &&
        new Date(value) < new Date(req.body.startDate)
      ) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("time")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Time cannot be empty"),
  body("venue")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Venue cannot be empty"),
  body("organizer")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Organizer cannot be empty"),
  body("contactPerson")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Contact person cannot be empty"),
  body("phoneNumber")
    .optional()
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Phone number must be a valid format"),
  body("participants")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Participants cannot be empty"),
  body("status")
    .optional()
    .isString()
    .trim()
    .isIn(STATUS_ENUM)
    .withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`),
  body("prizesAwards").optional().isString().trim(),
  body("requirements")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Requirements cannot be empty"),
  body("activities")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Activities cannot be empty"),
  body("categories").optional().isString().trim(),
  body("isActive").optional().isBoolean(),
  body("featuredEvent")
    .optional()
    .isBoolean()
    .withMessage("Featured event must be a boolean"),
  body().custom((value) => {
    const updateFields = [
      "eventTitle",
      "category",
      "description",
      "startDate",
      "endDate",
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
      "isActive",
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

const createEventValidation = [
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
    .notEmpty()
    .isIn(CATEGORY_ENUM)
    .withMessage(`Category must be one of: ${CATEGORY_ENUM.join(", ")}`),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("startDate")
    .exists()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date")
    .custom((value, { req }) => {
      if (req.body.endDate && new Date(value) > new Date(req.body.endDate)) {
        throw new Error("Start date must be before end date");
      }
      return true;
    }),
  body("endDate")
    .exists()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (
        req.body.startDate &&
        new Date(value) < new Date(req.body.startDate)
      ) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("time")
    .exists()
    .withMessage("Time is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Time cannot be empty"),
  body("venue")
    .exists()
    .withMessage("Venue is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Venue cannot be empty"),
  body("organizer")
    .exists()
    .withMessage("Organizer is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Organizer cannot be empty"),
  body("contactPerson")
    .exists()
    .withMessage("Contact person is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Contact person cannot be empty"),
  body("phoneNumber")
    .exists()
    .withMessage("Phone number is required")
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Phone number must be a valid format"),
  body("participants")
    .exists()
    .withMessage("Participants is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Participants cannot be empty"),
  body("status")
    .exists()
    .withMessage("Status is required")
    .isString()
    .trim()
    .isIn(STATUS_ENUM)
    .withMessage(`Status must be one of: ${STATUS_ENUM.join(", ")}`),
  body("prizesAwards")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Prizes/Awards cannot be empty"),
  body("requirements")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Requirements cannot be empty"),
  body("activities")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Activities cannot be empty"),
  body("categories")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Categories cannot be empty"),
  body("featuredEvent")
    .exists()
    .withMessage("Featured event is required")
    .isBoolean()
    .withMessage("Featured event must be a boolean"),
];

const deleteEventValidation = [
  body("event_id")
    .exists()
    .withMessage("Event ID is required for deletion")
    .isMongoId()
    .withMessage("Event ID must be a valid MongoDB ID"),
];

export { updateEventValidation, createEventValidation, deleteEventValidation };
