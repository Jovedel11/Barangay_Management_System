import { BaseTypes } from "@/models/documents.model";
import { Schema, model } from "mongoose";

type ItemBorrowRequest<T extends string> = BaseTypes<T> & {
  user: Schema.Types.ObjectId;
  quantity: number; // ✅ Added this type
  borrowDate: Date;
  returnDate: Date;
  purpose: T;
  eventLocation: T;
  contactNumber: T;
  deliveryMethod?: T;
  status?: string;
  category: string;
  main_item: Schema.Types.ObjectId;
};

type IBorrowableItem<T extends string> = {
  category: T;
  description: T;
  total: number;
  condition: T;
  maxBorrowDays: number;
  deliveryAvailable: boolean;
  requirements: T;
  notes: T;
  status: boolean;
};

const itemBorrowSchema = new Schema<ItemBorrowRequest<string>>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    quantity: { type: Number, required: true }, // ✅ Added this field
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    purpose: { type: String, required: true },
    eventLocation: { type: String, required: true },
    contactNumber: { type: String, required: true },
    deliveryMethod: { type: String, required: false },
    category: { type: String, required: true },
    status: { type: String, required: false, default: "pending" },
    main_item: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AvailableItems",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const borrowableItemSchema = new Schema<IBorrowableItem<string>>(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    total: { type: Number, required: true },
    condition: { type: String, required: true },
    maxBorrowDays: { type: Number, required: true },
    deliveryAvailable: { type: Boolean, required: true },
    requirements: { type: String, required: true },
    notes: { type: String, required: true },
    status: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
itemBorrowSchema.index({ borrowDate: 1, returnDate: 1, main_item: 1 });
itemBorrowSchema.index({ status: 1 });
itemBorrowSchema.index({ user: 1 });

const BorrowRequestModel = model<ItemBorrowRequest<string>>(
  "BorrowRequest",
  itemBorrowSchema
);
const BorrowableItemsModel = model<IBorrowableItem<string>>(
  "AvailableItems",
  borrowableItemSchema
);

export { BorrowRequestModel, BorrowableItemsModel };