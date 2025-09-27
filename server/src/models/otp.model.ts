import { Schema, model, Document } from "mongoose";

// 1. TypeScript Interface for the document's structure
export interface IOtp extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

// 3. Mongoose Schema Definition
const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// TTL (Time-To-Live) Index to automatically delete documents after the expiresAt time
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


export const Otp = model<IOtp>("Otp", otpSchema);