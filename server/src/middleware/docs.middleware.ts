import { body } from "express-validator";

const requiredString = (field: string, message?: string) =>
  body(field)
    .exists({ checkFalsy: true })
    .withMessage(message || `${field} is required.`)
    .isString()
    .withMessage(`${field} must be a string.`)
    .trim();

const requiredBoolean = (field: string, message?: string) =>
  body(field)
    .exists()
    .withMessage(message || `${field} is required.`)
    .isBoolean()
    .withMessage(`${field} must be true or false.`)
    .toBoolean();

/*
const requiredArray = (field: string, message?: string) =>
  body(field)
    .exists()
    .withMessage(message || `${field} is required.`)
    .isArray()
    .withMessage(`${field} must be an array.`);*/

const requestDocsValidation = [
  body("user")
    .exists({ checkFalsy: true })
    .withMessage("User ID is required.")
    .isMongoId()
    .withMessage("Invalid User ID format."),

  requiredString("purpose", "Purpose is required."),

  body("quantity")
    .exists({ checkFalsy: true })
    .withMessage("Quantity is required.")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a whole number greater than 0."),

  requiredBoolean("urgentRequest", "Urgent request status is required."),
  requiredString("deliveryMethod", "Delivery method is required.")
    .customSanitizer((value) => value.toLowerCase())
    .isIn(["pickup", "delivery"])
    .withMessage("Invalid delivery method."),

  requiredString("contactNumber", "Contact number is required.")
    .isMobilePhone("any")
    .withMessage("Invalid contact number format."),

  body("specificDetails")
    .optional()
    .isString()
    .withMessage("Specific details must be a string")
    .trim(),

  body("isPregnant")
    .optional()
    .isBoolean()
    .withMessage("isPregnant must be true or false")
    .toBoolean(),

  body("specificDetails")
    .optional()
    .isString()
    .withMessage("Specific details must be a string.")
    .trim(),

  requiredBoolean("isPregnant", "Pregnancy status is required."),
];

const availableDocsValidation = [
  requiredString("name", "Document name is required."),
  requiredString("category", "Category is required."),
  requiredString("description", "Description is required."),
  requiredString("fee", "Fee is required."),
  requiredString("processingTime", "Processing time is required."),
  requiredString("requirements", "Requirements list is required."),
  requiredString("purposes", "Purposes list is required."),
  requiredBoolean("deliveryAvailable", "Delivery availability is required."),
  requiredBoolean("urgent", "Urgent status is required."),
  requiredString("urgentFee", "Urgent fee is required."),
  requiredString("urgentTime", "Urgent time is required."),
  requiredBoolean("isActive", "IsActive status is required."),
  requiredString("specialNote", "SpecialNote status is required."),
];

const updateDocsValidation = [
  body("docs_id")
    .exists({ checkFalsy: true })
    .withMessage("docs_id is required")
    .isMongoId()
    .withMessage("Invalid docs_id format"),

  // Optional fields that can be updated
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
  body("fee")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Fee cannot be empty"),
  body("processingTime")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Processing time cannot be empty"),
  body("requirements")
    .optional()
    .isString()
    .withMessage("Requirements must be an array"),
  body("purposes")
    .optional()
    .isString()
    .withMessage("Purposes must be an array"),
  body("deliveryAvailable")
    .optional()
    .isBoolean()
    .withMessage("Delivery available must be boolean"),
  body("urgent").optional().isBoolean().withMessage("Urgent must be boolean"),
  body("urgentFee")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Urgent fee cannot be empty"),
  body("urgentTime")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Urgent time cannot be empty"),
  body("specialNote")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Special note cannot be empty"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),

  // Add status field validation for DocsModel
  body("status")
    .optional()
    .custom((value) => {
      if (typeof value === "boolean") {
        return true;
      }
      if (typeof value === "string") {
        const allowed = [
          "pending",
          "processing",
          "completed",
          "rejected",
          "approved",
        ];
        if (allowed.includes(value.toLocaleLowerCase())) {
          console.log("Allowed");
          return true;
        }
      }
      throw new Error(
        "Status must be a boolean or one of: pending, processing, completed, rejected, approved"
      );
    }),

  body().custom((value) => {
    const availableDocsFields = [
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
      "specialNote",
      "isActive",
    ];

    const docsModelFields = ["status"];
    const hasUpdateField = [...availableDocsFields, ...docsModelFields].some(
      (field) => value[field] !== undefined
    );

    if (!hasUpdateField) {
      throw new Error("At least one field must be provided to update");
    }
    return true;
  }),
];

const deleteDocsValidation = [
  body("docs_id")
    .exists({ checkFalsy: true })
    .withMessage("docs_id is required.")
    .isMongoId()
    .withMessage("Invalid docs_id format."),
];

export {
  requestDocsValidation,
  availableDocsValidation,
  updateDocsValidation,
  deleteDocsValidation,
};
