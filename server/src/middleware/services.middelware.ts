import { body, ValidationChain } from "express-validator";

interface Service {
  name: string;
  category: string;
  description: string;
  schedule: string;
  time: string;
  location: string;
  cost: string;
  requirements: string;
  serviceType: string;
  status: boolean;
  slots: string;
  contact: string;
  phone: string;
  details: string;
}

const validateService: ValidationChain[] = [
  body("name").isString().trim().notEmpty(),
  body("category").isString().trim().notEmpty(),
  body("description").isString().trim().notEmpty(),
  body("schedule").isString().trim().notEmpty(),
  body("time").isString().trim().notEmpty(),
  body("location").isString().trim().notEmpty(),
  body("cost").isString().trim().notEmpty(),
  body("serviceType").isString().trim().notEmpty(),
  body("slots").isString().trim().notEmpty(),
  body("contact").isString().trim().notEmpty(),
  body("phone").isString().trim().notEmpty(),
  body("details").isString().trim().notEmpty(),
  body("status").isBoolean(),
  body("requirements").isString().trim().notEmpty(),
];

export { validateService, type Service };
