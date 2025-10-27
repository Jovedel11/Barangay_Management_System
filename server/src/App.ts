import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import { store } from "@/config/db";
dotenv.config();
const isDeployed = process.env.NODE_ENV === "production";
import passport from "passport";
import "@/config/passport.strat";
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
import path from "path";
import type { Request, Response } from "express";

const app = express();
const server = http.createServer(app);

// Socket.io - also needs conditional CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
socketHandler(io);

app.use(express.json());
app.use(morgan(isDeployed ? "combined" : "dev"));

// CORS only in development
if (!isDeployed) {
  app.use(
    cors({
      origin: process.env.FRONT_END_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
}

app.use(
  session({
    secret: process.env.SECRET_KEY ?? "",
    resave: false,
    rolling: false,
    saveUninitialized: false,
    store: store,
    proxy: true, // Add this - important for production servers
    cookie: {
      httpOnly: true,
      secure: false, // Change to true if you have HTTPS/SSL
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 12,
      path: "/", // Add this explicitly
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/api/auth", authRouter);
app.use("/api/borrow-item", borrowItemsRouter);
app.use("/api/brgy-docs", docsRouter);
app.use("/api/brgy-services", brgyServiceRouter);
app.use("/api/brgy-events", brgyEventRouter);
app.use("/api/brgy-residents", brgyResidentsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/notification", notifRouter);

// Static files
const distPath = path.join(__dirname, "../../dist"); 
app.use(express.static(distPath));

// SPA catch-all - FIXED: changed from /*splat to *
app.get("/*splat", (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.use(errorHandler);

export default app;
export { server, io };
