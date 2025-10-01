import { BaseTypes } from "@/models/documents.model";
import { Schema, model } from "mongoose";

type ItemBorrowRequest<T extends string> = BaseTypes<T> & {
  user: Schema.Types.ObjectId;
  borrowDate: T;
  returnDate: T;
  eventLocation: T;
  contactNumber: T;
  specialRequirements: {
    isSenior: boolean;
    isFemale: boolean;
    isPregnant: boolean;
  };
  status?: string;
};

type IBorrowableItem<T extends string> = {
  //user: Schema.Types.ObjectId;
  name: T;
  category: T;
  description: T;
  available: number;
  total: number;
  condition: T;
  borrowingFee: T;
  maxBorrowDays: number;
  deliveryAvailable: boolean;
  requirements: T;
  notes: T;
  status: boolean;
};

const itemBorrowSchema = new Schema<ItemBorrowRequest<string>>({
  user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  quantity: { type: Number, required: true },
  borrowDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  purpose: { type: String, required: true },
  eventLocation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  specialRequirements: {
    isSenior: { type: Boolean, required: true },
    isFemale: { type: Boolean, required: true },
    isPregnant: { type: Boolean, required: true },
  },
  status: { type: String, required: false, default: "Pending" },
});

const borrowableItemSchema = new Schema<IBorrowableItem<string>>({
  //user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Number, required: true },
  total: { type: Number, required: true },
  condition: { type: String, required: true },
  borrowingFee: { type: String, required: true },
  maxBorrowDays: { type: Number, required: true },
  deliveryAvailable: { type: Boolean, required: true },
  requirements: { type: String, required: true },
  notes: { type: String, required: true },
  status: { type: Boolean, required: false, default: false },
});

const BorrowRequestModel = model<ItemBorrowRequest<string>>(
  "BorrowRequest",
  itemBorrowSchema
);
const BorrowableItemsModel = model<IBorrowableItem<string>>(
  "AvailableItems",
  borrowableItemSchema
);

export { BorrowRequestModel, BorrowableItemsModel };
