import type { Request, Response, NextFunction } from "express";
import { UserModel } from "@/models/user.model";
import { validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import passport from "passport";
dotenv.config();

type RegisterInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, email, firstName, lastName, phone } = matchedData(
      req
    ) as RegisterInfo;
    const newUser = new UserModel({
      password,
      email,
      firstName,
      lastName,
      ...(phone ? { phone } : {}),
    });
    const { _id } = await newUser.save();
    if (_id) {
      return res.status(201).json({ message: "User registered successfully" });
    }
    return res.status(400).json({ message: "User ID already exists" });
  } catch (error) {
    next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error, user: any | false, _next: NextFunction) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (!user) {
        return res.status(401).json({ message: "Incorrect credentials" });
      }

      req.login(user, (err) => {
        if (err) return res.status(500).json({ message: "Login error" });
        if (user && !user.role) {
          return res.status(403).json({ message: "No role field specified" });
        }
        return res.status(200).json({ message: "Signed in successfully" });
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
