import { Schema, model, Document, ObjectId } from "mongoose";

type IBrgyService<T extends string> = {
  name: T;
  category: T;
  description: T;
  schedule: T;
  time: T;
  location: T;
  cost: T;
  requirements: T;
  serviceType: T;
  status: boolean;
  slots: T;
  contact: T;
  phone: T;
  details: T;
};

interface IServiceRequestBase {
  user: ObjectId;
  service: string;
  category: string;
  status: "confirmed" | "pending" | "completed" | "rescheduled";
  details: string;
  specialNote?: string;
}

export interface IServiceRequest extends IServiceRequestBase, Document {
  createdAt: Date;
  updatedAt: Date;
}

const serviceRequestSchema = new Schema<IServiceRequest>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    service: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["confirmed", "pending", "completed", "rescheduled"],
    },
    details: { type: String, required: true },
    specialNote: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const brgyServiceSchema = new Schema<IBrgyService<string>>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: String, required: true },
  requirements: { type: String, required: true },
  serviceType: { type: String, required: true },
  status: { type: Boolean, required: true },
  slots: { type: String, required: true },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  details: { type: String, required: true },
});

const BrgyService = model<IBrgyService<string>>(
  "BarangayService",
  brgyServiceSchema
);

const ServiceRequest = model<IServiceRequest>(
  "ServiceRequest",
  serviceRequestSchema
);

export { BrgyService, ServiceRequest };
