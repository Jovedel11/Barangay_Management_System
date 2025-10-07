import { Router } from "express";
import { getDashboardStats } from "@/controller/dashboard.controller";
const dashboardRouter = Router();

dashboardRouter.get("/stats", getDashboardStats);

export default dashboardRouter;
