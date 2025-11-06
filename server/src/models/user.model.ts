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
  barangay_id_image: string;
  resident_address: string;
  residency_status: string;
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
    phone_number: {
      type: String,
      default: "Phone is not provided",
      unique: true,
    },
    resident_address: { type: String, required: true },
    residency_status: { type: String, required: true },
    barangay_id_image: { type: String, required: true },
  },
  { timestamps: true }
);

accountSchema.pre("updateOne", async function (next) {
  let update = this.getUpdate() as any;

  // If the update uses $set
  if (update.$set && update.$set.password) {
    const hashed = await bcrypt.hash(update.$set.password, 10);
    update.$set.password = hashed;
  }

  // If the update sets password directly
  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 10);
    update.password = hashed;
  }

  this.setUpdate(update);
  next();
});

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
