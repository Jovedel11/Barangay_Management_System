import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyOtp,
  authSender,
} from "@/controller/auth.controller";
import { checkEmail, validateRegistration } from "@/middleware/user.middleware";
import multer from "multer";
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/check-session", authSender);
router.post(
  "/register",
  upload.single("barangay_id_image"),
  validateRegistration,
  checkEmail,
  register
);
router.post("/login", login);
router.get("/logout", logout);
router.post("/verify-otp", verifyOtp);
export default router;
