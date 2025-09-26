import { Schema, model } from "mongoose";

type IBarangayEvent<T extends string> = {
  title: T;
  category: T;
  description: T;
  date: T;
  endDate: T;
  time: T;
  venue: T;
  organizer: T;
  contact: T;
  phone: T;
  status: T;
  participants: T;
  prizes: T;
  requirements: T;
  image: T;
  featured: boolean;
};

const barangayEventSchema = new Schema<IBarangayEvent<string>>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  endDate: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  organizer: { type: String, required: true },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  participants: { type: String, required: true },
  prizes: { type: String, required: true },
  requirements: { type: String, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, required: true },
});

const BrgyEvent = model<IBarangayEvent<string>>(
  "BarangayEvent",
  barangayEventSchema
);

export default BrgyEvent;
