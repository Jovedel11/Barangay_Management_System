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

const requiredArray = (field: string, message?: string) =>
  body(field)
    .exists()
    .withMessage(message || `${field} is required.`)
    .isArray()
    .withMessage(`${field} must be an array.`);

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
    .isIn(["pickup", "delivery"])
    .withMessage("Invalid delivery method."),

  requiredString("contactNumber", "Contact number is required.")
    .isMobilePhone("any")
    .withMessage("Invalid contact number format."),

  body("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Email address is required.")
    .isEmail()
    .withMessage("Invalid email address format."),

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

  requiredArray("requirements", "Requirements list is required."),
  requiredString("requirements.*.requirement", "Each requirement is required."),

  requiredArray("purposes", "Purposes list is required."),
  requiredString("purposes.*.purpose", "Each purpose is required."),

  requiredBoolean("deliveryAvailable", "Delivery availability is required."),
  requiredBoolean("urgent", "Urgent status is required."),
  requiredString("urgentFee", "Urgent fee is required."),
  requiredString("urgentTime", "Urgent time is required."),
];

const updateDocsValidation = [
  body("docs_id")
    .exists({ checkFalsy: true })
    .withMessage("docs_id is required.")
    .isMongoId()
    .withMessage("Invalid docs_id format."),

  body().custom((_value, { req }) => {
    const { docs_id, ...updateFields } = req.body;

    if (Object.keys(updateFields).length === 0) {
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
