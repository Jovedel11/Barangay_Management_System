import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyOtp,
  authSender,
} from "@/controller/auth.controller";
import { checkEmail, validateRegistration } from "@/middleware/user.middleware";
const router = Router();

router.get("/check-session", authSender);
router.post("/register", validateRegistration, checkEmail, register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-otp", verifyOtp);
export default router;
