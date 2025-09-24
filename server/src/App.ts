import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

export default app;
