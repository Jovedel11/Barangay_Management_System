import { Router } from "express";
import {
  adminDashboardStats,
  residentDashboardStats,
  getDocsRequest,
} from "@/controller/dashboard.controller";
import { query } from "express-validator";
const dashboardRouter = Router();

dashboardRouter.get("/admin/stats", adminDashboardStats);
dashboardRouter.get(
  "/resident/stats",
  query("userID")
    .isMongoId()
    .withMessage("User ID type is invalid")
    .notEmpty()
    .withMessage("User ID is required"),
  residentDashboardStats
);
dashboardRouter.get(
  "/resident/docs-req",
  query("userID")
    .isMongoId()
    .withMessage("User ID type is invalid")
    .notEmpty()
    .withMessage("User ID is required"),
  getDocsRequest
);

export default dashboardRouter;
