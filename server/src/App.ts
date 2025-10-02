import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import { store } from "@/config/db";
dotenv.config();
const isDeployed = process.env.NODE_ENV === "production";
import passport from "passport";
import "@/config/passport.strat"; // Ensure passport strategies are configured
import errorHandler from "@/middleware/error.middleware";
import authRouter from "@/routers/auth.router";
import docsRouter from "@/routers/docs.router";
import borrowItemsRouter from "@/routers/borrow.items.router";
import brgyServiceRouter from "@/routers/brgy.services.router";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET_KEY ?? "",
    resave: false,
    rolling: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: isDeployed, //must be false in production
      secure: isDeployed, //HTTPS only in production
      sameSite: isDeployed ? "strict" : "lax", //strict only in production
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRouter);
app.use("/api/borrow-item", borrowItemsRouter);
app.use("/api/brgy-docs", docsRouter);
app.use("/api/brgy-services", brgyServiceRouter);

app.use(errorHandler);

export default app;
