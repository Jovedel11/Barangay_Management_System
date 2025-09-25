import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";

//user types to avoid errors
interface IAccount extends Document {
  first_name: string;
  last_name: string;
  phone_number: string;
  status: "pending" | "approved" | "rejected";
  role: "resident" | "admin";
  email: string;
  password: string;
  validatePassword: (plainPassword: string, email: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

//User schema
const accountSchema = new Schema<IAccount>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["resident", "admin"],
      default: "resident",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    phone_number: { type: String, default: "Phone is not provided", unique: true },
  },
  { timestamps: true }
);

//Custom Method
accountSchema.methods.validatePassword = async function <T extends string>(
  plainPassword: T,
  email: T
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result && email === this.email;
};

accountSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //isModified is a mongoose method to check if the field is modified since the last save
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const AccountModel = model<IAccount>("Account", accountSchema);

export { AccountModel, accountSchema };
