import { body } from "express-validator";
import type { Request, Response, NextFunction } from "express";
import { AccountModel } from "@/models/user.model";

const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await AccountModel.findOne({ email });
  console.log(email);
  if (user) {
    console.log("Email exists");
    return res.status(400).json({ message: "Email is already in use" });
  }
  console.log("Next gets executed");
  next();
};

const validateRegistration = [
  body("first_name").trim().notEmpty().withMessage("First name is required"),
  body("last_name").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("residency_status")
    .trim()
    .notEmpty()
    .withMessage("Residency status is required"),
  body("resident_address")
    .trim()
    .notEmpty()
    .withMessage("Resident address is required"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("phone_number")
    .optional({ nullable: true })
    .trim()
    .isMobilePhone("any")
    .withMessage("Valid phone number is required"),
];

export { validateRegistration, checkEmail };
