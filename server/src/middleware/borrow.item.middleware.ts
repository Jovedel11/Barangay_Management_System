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
];

const borrowableItemValidation = [
  body("user")
    .exists()
    .withMessage("User ID is required.")
    .notEmpty()
    .withMessage("User ID cannot be empty.")
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID."),
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
  body("requirements")
    .exists()
    .withMessage("Requirements are required.")
    .isArray({ min: 1 })
    .withMessage("Requirements must be a non-empty array of strings.")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      if (
        value.some((item) => typeof item !== "string" || item.trim() === "")
      ) {
        throw new Error("All requirements must be non-empty strings.");
      }
      return true;
    }),
  body("notes")
    .exists()
    .withMessage("Notes are required.")
    .notEmpty()
    .withMessage("Notes cannot be empty."),
];

const updateItemValidation = [
  body("item_id")
    .exists()
    .withMessage("Item ID is required")
    .isMongoId()
    .withMessage("Item ID must be a valid MongoDB ID"),
  body()
    .notEmpty()
    .withMessage(
      "Request body cannot be empty and must contain fields to update"
    ),
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
