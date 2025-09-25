import { body } from "express-validator";

const validateRegistration = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("phone")
    .optional({ nullable: true })
    .trim()
    .isMobilePhone("any")
    .withMessage("Valid phone number is required"),
];

export { validateRegistration };
