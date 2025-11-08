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
  specificDetails: T;
  status?: string;
  category: string;
  name: string;
  digitallyAvailable: boolean;
  fileSrc?: string;
  fileName?: string;
};

const docsSchema = new Schema<DocumentRequest<string>>({
  user: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  purpose: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  digitallyAvailable: { type: Boolean, required: true },
  urgentRequest: { type: Boolean, required: true },
  deliveryMethod: { type: String, required: true },
  contactNumber: { type: String, required: true },
  specificDetails: { type: String, required: false },
  fileSrc: { type: String, required: false },
  fileName: { type: String, required: false },
  status: { type: String, required: false, default: "pending" },
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
  requirements: Pick<IDocumentItem, "requirement">;
  purposes: Pick<IDocumentItem, "purpose">;
  urgent: boolean;
  urgentFee: string;
  urgentTime: string;
  isActive: boolean;
  digitallyAvailable: boolean;
  deliveryAvailable: boolean;
  specialNote: string;
  totalReq?: number;
  pendings?: number;
}

const AvailableDocsSchema = new Schema<IAvailableDoc>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  fee: { type: String, required: true },
  processingTime: { type: String, required: true },
  requirements: { type: String, required: true },
  purposes: { type: String, required: true },
  urgent: { type: Boolean, required: false, default: false },
  urgentFee: { type: String, required: false },
  digitallyAvailable: { type: Boolean, required: true },
  urgentTime: { type: String, required: false },
  deliveryAvailable: { type: Boolean, required: true },
  isActive: { type: Boolean, required: true },
  specialNote: { type: String, required: true },
  totalReq: { type: Number, required: false, default: 0 }, //No functionalities yet
  pendings: { type: Number, required: false, default: 0 }, //No functionalities yet
});

const AvailableDocs = model<IAvailableDoc>(
  "AvailableDocs",
  AvailableDocsSchema
);

const DocsModel = model<DocumentRequest<string>>("DocsModel", docsSchema);

export { DocsModel, AvailableDocs };
