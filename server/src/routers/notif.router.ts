import { Router } from "express";
import { body, query } from "express-validator";
import {
  createNotif,
  getNotif,
  deleteNotif,
} from "@/controller/notif.controller";
const notifRouter = Router();
notifRouter.post(
  "/create",
  [
    body("user_id").isMongoId().withMessage("Invalid user ID format"),
    body("title").notEmpty().withMessage("Title is required"),
    body("message").notEmpty().withMessage("Message is required"),
    body("link").notEmpty().withMessage("Link is required"),
  ],
  createNotif
);

notifRouter.get(
  "/retrieve",
  [query("user_id").isMongoId().withMessage("Invalid user ID format")],
  getNotif
);

notifRouter.delete(
  "/delete",
  [query("user_id").isMongoId().withMessage("Invalid user ID format")],
  deleteNotif
);

export default notifRouter;
