import { Schema, model } from "mongoose";

type IBrgyService<T extends string> = {
  name: T;
  category: T;
  description: T;
  schedule: T;
  time: T;
  location: T;
  cost: T;
  requirements: T[];
  serviceType: T;
  available: boolean;
  slots: T;
  contact: T;
  phone: T;
  details: T;
};

const brgyServiceSchema = new Schema<IBrgyService<string>>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: String, required: true },
  requirements: { type: [String], required: true },
  serviceType: { type: String, required: true },
  available: { type: Boolean, required: true },
  slots: { type: String, required: true },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  details: { type: String, required: true },
});

const BrgyService = model<IBrgyService<string>>(
  "BarangayService",
  brgyServiceSchema
);

export default BrgyService;
