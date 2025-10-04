import { Schema, model, Document } from "mongoose";

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
});

export const BrgyEvent = model<IEvent>("Event", EventSchema);
