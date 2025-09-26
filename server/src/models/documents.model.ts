import { model, Schema } from "mongoose";

export type BaseTypes<U extends string> = {
  purpose: U;
  quantity: number;
  deliveryMethod: U;
};

type DocumentRequest<T extends string> = BaseTypes<T> & {
  urgentRequest: boolean;
  contactNumber: T;
  emailAddress: T;
  specificDetails: T;
  isPregnant: boolean;
};

const docsSchema = new Schema<DocumentRequest<string>>({
  purpose: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgentRequest: { type: Boolean, required: true },
  deliveryMethod: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  specificDetails: { type: String, required: false },
  isPregnant: { type: Boolean, required: true },
});

const DocsModel = model<DocumentRequest<string>>("DocsModel", docsSchema);

export default DocsModel;
