import { body } from "express-validator";
export const updateAccountValidation = [
  // ID validation
  body("docs_id")
    .exists()
    .withMessage("Account ID is required")
    .isMongoId()
    .withMessage("Account ID must be a valid MongoDB ID")
    .custom((_, { req }) => {
      console.log("Received body:", req.body); // Debug log
      return true;
    }),

  // Optional fields with relaxed validation for profile updates
  body("first_name")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("last_name")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("phone_number")
    .optional()
    .isString()
    .trim()
    .matches(/^(?:\+63|0)9\d{9}$/)
    .withMessage(
      "Phone number must be in format: 09XXXXXXXXX or +639XXXXXXXXX"
    ),
  body("password")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  // No custom validation for checking fields - allow partial updates
];
