import { body } from "express-validator";
export const updateAccountValidation = [
  // ID validation
  body("docs_id")
    .exists()
    .withMessage("Account ID is required")
    .isMongoId()
    .withMessage("Account ID must be a valid MongoDB ID"),

  // Optional fields for update
  body("first_name")
    .optional()
    .isString()
    .trim()
    .withMessage(
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  body("last_name")
    .optional()
    .isString()
    .trim()
    .withMessage("Last name must not be empty and a string"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .trim()
    .toLowerCase(),
  body("phone_number")
    .optional()
    .isString()
    .trim()
    .matches(/^(?:\+63|0)9\d{9}$/)
    .withMessage(
      "Phone number must be a valid Philippine mobile number format (+639XXXXXXXXX or 09XXXXXXXXX)"
    ),
  body().custom((value) => {
    const updateFields = [
      "first_name",
      "last_name",
      "email",
      "phone_number",
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

export const passwordConfirmationValidation = [
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

  body("confirmPassword")
    .exists()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
];
