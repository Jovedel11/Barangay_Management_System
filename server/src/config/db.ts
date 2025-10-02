import mongoose from "mongoose";
import MongoDBStore from "connect-mongodb-session";
import session from "express-session";

const MongoDBSessionStore = MongoDBStore(session);
const store = new MongoDBSessionStore({
  uri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/Barangay",
  collection: "sessions",
});
//change the path according to your .env file or your local mongodb server

const ConnectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        ("mongodb://localhost:27017/Barangay" as string)
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export { ConnectDB, store };
