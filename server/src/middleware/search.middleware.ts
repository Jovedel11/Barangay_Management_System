import { query } from "express-validator";

const searchItemValidation = [
  query("search")
    .optional()
    .trim()
    .isString()
    .withMessage("Search term must be between 1 and 255 characters."),
  query("category")
    .optional()
    .trim()
    .isString()
    .withMessage("Category must be a string between 1 and 50 characters."),
];

export default searchItemValidation;