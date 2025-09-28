import { model, Schema } from "mongoose";

export type BaseTypes<U extends string> = {
  purpose?: U;
  quantity: number;
  deliveryMethod: U;
};

type DocumentRequest<T extends string> = BaseTypes<T> & {
  user: Schema.Types.ObjectId;
  urgentRequest: boolean;
  contactNumber: T;
  emailAddress: T;
  specificDetails: T;
  isPregnant: boolean;
};

const docsSchema = new Schema<DocumentRequest<string>>({
  user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  purpose: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgentRequest: { type: Boolean, required: true },
  deliveryMethod: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  specificDetails: { type: String, required: false },
  isPregnant: { type: Boolean, required: true },
});

// Reused interface for both purposes and requirements
interface IDocumentItem {
  purpose?: string;
  requirement?: string;
}

interface IAvailableDoc {
  name: string;
  category: string;
  description: string;
  fee: string;
  processingTime: string;
  requirements: Pick<IDocumentItem, "requirement">[];
  purposes: Pick<IDocumentItem, "purpose">[];
  deliveryAvailable: boolean;
  urgent: boolean;
  urgentFee: string;
  urgentTime: string;
}

const AvailableDocsSchema = new Schema<IAvailableDoc>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  fee: { type: String, required: true },
  processingTime: { type: String, required: true },
  requirements: [
    {
      requirement: { type: String, required: true },
    },
  ],
  purposes: [
    {
      purpose: { type: String, required: true },
    },
  ],
  deliveryAvailable: { type: Boolean, required: true },
  urgent: { type: Boolean, required: true },
  urgentFee: { type: String, required: true },
  urgentTime: { type: String, required: true },
});

const AvailableDocs = model<IAvailableDoc>(
  "AvailableDocs",
  AvailableDocsSchema
);

const DocsModel = model<DocumentRequest<string>>("DocsModel", docsSchema);

export { DocsModel, AvailableDocs };
