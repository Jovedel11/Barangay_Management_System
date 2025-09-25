import type { Request, Response, NextFunction } from "express";
import { AccountModel } from "@/models/user.model";
import { validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import passport from "passport";
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
    (err: Error, user: any | false, _next: NextFunction) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (!user) {
        return res.status(401).json({ success: false, role: null });
      }

      req.login(user, (err) => {
        if (err) return res.status(500).json({ success: false, role: null });
        if (user && !user.role) {
          return res.status(403).json({ success: false, role: null });
        }
        return res.status(200).json({ success: true, role: user.role });
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
    res.status(200).send("Signout");
  });
};

const authSender = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  }
  return res.status(200).json({ user: null });
};

export { register, login, authSender, logout };
