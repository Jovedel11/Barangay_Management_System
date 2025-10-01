import { body } from "express-validator";

const itemBorrowValidation = [
  body("user")
    .exists()
    .withMessage("User ID is required.")
    .notEmpty()
    .withMessage("User ID cannot be empty.")
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID."),
  body("quantity")
    .exists()
    .withMessage("Quantity is required.")
    .notEmpty()
    .withMessage("Quantity cannot be empty.")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer."),
  body("borrowDate")
    .exists()
    .withMessage("Borrow date is required.")
    .notEmpty()
    .withMessage("Borrow date cannot be empty."),
  body("returnDate")
    .exists()
    .withMessage("Return date is required.")
    .notEmpty()
    .withMessage("Return date cannot be empty."),
  body("purpose")
    .exists()
    .withMessage("Purpose is required.")
    .notEmpty()
    .withMessage("Purpose cannot be empty."),
  body("eventLocation")
    .exists()
    .withMessage("Event location is required.")
    .notEmpty()
    .withMessage("Event location cannot be empty."),
  body("contactNumber")
    .exists()
    .withMessage("Contact number is required.")
    .notEmpty()
    .withMessage("Contact number cannot be empty."),
  body("deliveryMethod")
    .exists()
    .withMessage("Delivery method is required.")
    .notEmpty()
    .withMessage("Delivery method cannot be empty."),
  body("specialRequirements.isSenior")
    .exists()
    .withMessage("isSenior status is required.")
    .isBoolean()
    .withMessage("isSenior must be a boolean (true or false)."),
  body("specialRequirements.isFemale")
    .exists()
    .withMessage("isFemale status is required.")
    .isBoolean()
    .withMessage("isFemale must be a boolean (true or false)."),
  body("specialRequirements.isPregnant")
    .exists()
    .withMessage("isPregnant status is required.")
    .isBoolean()
    .withMessage("isPregnant must be a boolean (true or false)."),
  body("status").optional().isString().withMessage("status must be a string"),
];

const borrowableItemValidation = [
  /*body("user")
    .exists()
    .withMessage("User ID is required.")
    .notEmpty()
    .withMessage("User ID cannot be empty.")
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID."),*/
  body("name")
    .exists()
    .withMessage("Item name is required.")
    .notEmpty()
    .withMessage("Item name cannot be empty."),
  body("category")
    .exists()
    .withMessage("Category is required.")
    .notEmpty()
    .withMessage("Category cannot be empty."),
  body("description")
    .exists()
    .withMessage("Description is required.")
    .notEmpty()
    .withMessage("Description cannot be empty."),
  body("available")
    .exists()
    .withMessage("Available quantity is required.")
    .notEmpty()
    .withMessage("Available quantity cannot be empty.")
    .isInt({ min: 0 })
    .withMessage("Available quantity must be a non-negative integer."),
  body("total")
    .exists()
    .withMessage("Total quantity is required.")
    .notEmpty()
    .withMessage("Total quantity cannot be empty.")
    .isInt({ gt: 0 })
    .withMessage("Total quantity must be a positive integer."),
  body("condition")
    .exists()
    .withMessage("Condition is required.")
    .notEmpty()
    .withMessage("Condition cannot be empty."),
  body("borrowingFee")
    .exists()
    .withMessage("Borrowing fee is required.")
    .notEmpty()
    .withMessage("Borrowing fee cannot be empty."),
  body("maxBorrowDays")
    .exists()
    .withMessage("Max borrow days is required.")
    .notEmpty()
    .withMessage("Max borrow days cannot be empty.")
    .isInt({ gt: 0 })
    .withMessage("Max borrow days must be a positive integer."),
  body("deliveryAvailable")
    .exists()
    .withMessage("Delivery availability is required.")
    .isBoolean()
    .withMessage("Delivery availability must be a boolean (true or false)."),
  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status availability must be a boolean (true or false)."),
  body("requirements")
    .exists()
    .withMessage("Requirements are required.")
    .isString()
    .withMessage("Requirements must be strings."),
  body("notes")
    .exists()
    .withMessage("Notes are required.")
    .notEmpty()
    .withMessage("Notes cannot be empty."),
];

const updateItemValidation = [
  body("docs_id")
    .exists()
    .withMessage("Item ID is required")
    .isMongoId()
    .withMessage("Item ID must be a valid MongoDB ID"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("available")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available must be a non-negative integer"),
  body("total")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Total must be a positive integer"),
  body("condition")
    .optional()
    .isString()
    .withMessage("Condition must be a string"),
  body("borrowingFee")
    .optional()
    .isString()
    .withMessage("Borrowing fee must be a string"),
  body("maxBorrowDays")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Max borrow days must be a positive integer"),
  body("deliveryAvailable")
    .optional()
    .isBoolean()
    .withMessage("Delivery available must be a boolean"),
  body("requirements")
    .optional()
    .isString()
    .withMessage("Requirements must be a string"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
  body("status").optional().isBoolean().withMessage("Status must be a boolean"),
  body().custom((value) => {
    const updateFields = [
      "name",
      "category",
      "description",
      "available",
      "total",
      "condition",
      "borrowingFee",
      "maxBorrowDays",
      "deliveryAvailable",
      "requirements",
      "notes",
      "status",
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

const deleteItemValidation = [
  body("item_id")
    .exists()
    .withMessage("Item ID is required for deletion")
    .isMongoId()
    .withMessage("Item ID must be a valid MongoDB ID"),
];

export {
  itemBorrowValidation,
  borrowableItemValidation,
  updateItemValidation,
  deleteItemValidation,
};
