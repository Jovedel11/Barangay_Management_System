import {
  body,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

const createResidentValidation: ValidationChain[] = [
  body("firstName")
    .exists()
    .withMessage("First name is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),
  body("lastName")
    .exists()
    .withMessage("Last name is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),
  body("dateOfBirth")
    .exists()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date")
    .toDate(),
  body("gender")
    .exists()
    .withMessage("Gender is required")
    .isString()
    .trim()
    .isIn(["Male", "Female", "Other", "Prefer not to say"])
    .withMessage("Gender must be Male, Female, Other, or Prefer not to say"),
  body("civilStatus")
    .exists()
    .withMessage("Civil status is required")
    .isString()
    .trim()
    .isIn(["single", "married", "divorced", "widowed"])
    .withMessage("Invalid civil status"),
  body("completeAddress")
    .exists()
    .withMessage("Complete address is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Complete address cannot be empty"),
  body("phoneNumber")
    .exists()
    .withMessage("Phone number is required")
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Phone number must be in a valid format"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("emergencyContact")
    .exists()
    .withMessage("Emergency contact is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Emergency contact cannot be empty"),
  body("emergencyPhone")
    .exists()
    .withMessage("Emergency phone is required")
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Emergency phone must be in a valid format"),
  body("occupation")
    .exists()
    .withMessage("Occupation is required")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Occupation cannot be empty"),
  body("familyMember")
    .optional()
    .isString()
    .withMessage("Family members must be a string"),
  body("isSenior")
    .optional()
    .isBoolean()
    .withMessage("Senior status must be a boolean value")
    .default(false),
  body("isPwd")
    .optional()
    .isBoolean()
    .withMessage("PWD status must be a boolean value")
    .default(false),
  body("isPregnant")
    .optional()
    .isBoolean()
    .withMessage("Pregnant status must be a boolean value")
    .default(false),
  body("isRegisteredVoter")
    .optional()
    .isBoolean()
    .withMessage("Registered voter status must be a boolean value")
    .default(false),
];

const updateResidentValidation = [
  body("docs_id")
    .exists()
    .withMessage("Resident ID is required")
    .isMongoId()
    .withMessage("Resident ID must be a valid MongoDB ID"),
  body("firstName")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),
  body("lastName")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date")
    .toDate(),
  body("gender")
    .optional()
    .isString()
    .trim()
    .isIn(["Male", "Female", "Other", "Prefer not to say"])
    .withMessage("Gender must be Male, Female, Other, or Prefer not to say"),
  body("civilStatus")
    .optional()
    .isString()
    .trim()
    .isIn(["single", "married", "divorced", "widowed"])
    .withMessage("Invalid civil status"),
  body("completeAddress")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Complete address cannot be empty"),
  body("phoneNumber")
    .optional()
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Phone number must be in a valid format"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("emergencyContact")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Emergency contact cannot be empty"),
  body("emergencyPhone")
    .optional()
    .isString()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage("Emergency phone must be in a valid format"),
  body("occupation")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Occupation cannot be empty"),
  body("familyMember")
    .optional()
    .isString()
    .withMessage("Family members must be a string"),
  body("isSenior")
    .optional()
    .isBoolean()
    .withMessage("Senior status must be a boolean value"),
  body("isPwd")
    .optional()
    .isBoolean()
    .withMessage("PWD status must be a boolean value"),
  body("isPregnant")
    .optional()
    .isBoolean()
    .withMessage("Pregnant status must be a boolean value"),
  body("isRegisteredVoter")
    .optional()
    .isBoolean()
    .withMessage("Registered voter status must be a boolean value"),
  body().custom((value) => {
    const updateFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "civilStatus",
      "completeAddress",
      "phoneNumber",
      "email",
      "emergencyContact",
      "emergencyPhone",
      "occupation",
      "familyMember",
      "isSenior",
      "isPwd",
      "isPregnant",
      "isRegisteredVoter",
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

const deleteResidentValidation = [
  body("resident_id")
    .exists()
    .withMessage("Resident ID is required for deletion")
    .isMongoId()
    .withMessage("Resident ID must be a valid MongoDB ID"),
];

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); 
    console.log("Error in resident validation");
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export {
  updateResidentValidation,
  createResidentValidation,
  handleValidationErrors,
  deleteResidentValidation,
};
