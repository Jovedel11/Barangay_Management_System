import type { Request, Response, NextFunction } from "express";
import { AccountModel } from "@/models/user.model";
import { validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import passport from "passport";
import SendOtp from "@/middleware/email.otp";
import { Otp } from "@/models/otp.model";
dotenv.config();

type RegisterInfo = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, email, first_name, last_name, phone_number } =
      matchedData(req) as RegisterInfo;
    const newUser = new AccountModel({
      password,
      email,
      first_name,
      last_name,
      ...(phone_number ? { phone_number } : {}),
    });
    const { _id } = await newUser.save();
    console.log(_id);
    if (_id) {
      return res.status(200).json({ message: "User registered successfully" });
    }
    return res.status(400).json({ message: "User already exists" });
  } catch (error) {
    console.log("Error in register");
    next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    async (err: Error, user: any | false, _next: NextFunction) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (user.role !== "admin" && user.status === "rejected") {
        return res
          .status(403)
          .json({ success: false, role: null, status: "rejected" });
      }
      if (user.role !== "admin" && user.status === "pending") {
        return res
          .status(403)
          .json({ success: false, role: null, status: "pending" });
      }

      if (!user) {
        return res.status(401).json({ success: false, role: null });
      }

      req.login(user, async (err) => {
        if (err) return res.status(500).json({ success: false, role: null });
        if (user && !user.role) {
          return res.status(403).json({ success: false, role: null });
        }
        if (user.role !== "admin") {
          return res.status(200).json({ success: true, role: user.role });
        }
        const result = await SendOtp(user as Record<string, string>);
        if (result.success)
          return res.status(200).json({ success: true, role: user.role });
        next(result.error);
      });
    }
  )(req, res, next);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err: Error) => {
    if (err) {
      console.log("Couldn't destroy the session");
      next(err);
      return;
    }
    res.clearCookie("connect.sid");
    res.status(200).send({ message: "signout success" });
  });
};

const authSender = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(200).json({ user: null });
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("User is not login");
    const { code } = req.body;
    const user = (req as any).user;

    const record = await Otp.findOne({ email: user.email, code });
    if (!record) {
      return res.sendStatus(400);
    }

    if (record.expiresAt < new Date()) {
      return res.sendStatus(400);
    }
    await Otp.deleteOne({ email: user.email });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { register, login, authSender, logout, verifyOtp };
