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
import brgyEventRouter from "@/routers/brgy.event.router";
import brgyResidentsRouter from "@/routers/brgy.resident.router";
import dashboardRouter from "@/routers/dashboard.router";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./config/socket.connection";
import notifRouter from "./routers/notif.router";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
socketHandler(io);

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
      maxAge: 1000 * 60 * 60 * 4,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRouter);
app.use("/api/borrow-item", borrowItemsRouter);
app.use("/api/brgy-docs", docsRouter);
app.use("/api/brgy-services", brgyServiceRouter);
app.use("/api/brgy-events", brgyEventRouter);
app.use("/api/brgy-residents", brgyResidentsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/notification", notifRouter);

app.use(errorHandler);

export default app;
export { server };
