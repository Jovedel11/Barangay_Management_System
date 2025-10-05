import { Schema, model, Document } from "mongoose";

interface IParticipant extends Document {
  teamMemberParticipant: string;
  specialRequirements: string;
  contactNumber: string;
  status: "pending" | "completed" | "cancelled";
  paymentStatus: "paid" | "refunded" | "not paid";
  processingNotes: string;
  eventTitle: string;
  category: string;
  dateOfEvent: Date;
  payment?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IEvent extends Document {
  eventTitle: string;
  category: string;
  description: string;
  startDate: Date;
  endDate: Date;
  time: string;
  venue: string;
  organizer: string;
  contactPerson: string;
  phoneNumber: string;
  participants: string;
  status: string;
  prizesAwards?: string;
  requirements?: string;
  activities?: string;
  categories?: string;
  featuredEvent: boolean;
  isActive?: boolean;
}

const EventSchema = new Schema<IEvent>({
  eventTitle: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Sports Athletic",
      "Beauty Pageants",
      "Entertainment",
      "Competitions",
      "Comunity Events",
      "Fiesta & Celebration",
    ],
  },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  organizer: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  participants: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["upcoming", "ongoing", "completed", "cancelled", "postponed"],
  },
  prizesAwards: { type: String },
  requirements: { type: String },
  activities: { type: String },
  categories: { type: String },
  featuredEvent: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

const participantSchema: Schema = new Schema<IParticipant>(
  {
    eventTitle: { type: String, required: true },
    dateOfEvent: { type: Date, required: true },
    category: { type: String, required: true },
    teamMemberParticipant: {
      type: String,
      required: true,
      trim: true,
    },
    specialRequirements: {
      type: String,
      default: "",
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["paid", "refunded", "not paid"],
      default: "not paid",
    },
    processingNotes: {
      type: String,
      default: "",
    },
    payment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BrgyEvent = model<IEvent>("Event", EventSchema);
const EventRequest = model<IParticipant>("EventRequest", participantSchema);

export { BrgyEvent, EventRequest };
