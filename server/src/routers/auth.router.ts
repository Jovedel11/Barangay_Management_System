import { Router } from "express";
import { register, login, logout } from "@/controller/auth.controller";
import { validateRegistration } from "@/middleware/user.middleware";
const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", login);
router.post("/logout", logout);
export default router;
