import { Schema, model, type Document } from "mongoose";
import bcrypt from "bcrypt";

//user types to avoid errors
interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  role: "resident" | "admin";
  email: string;
  password: string;
  validatePassword: (plainPassword: string, email: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

//User schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, default: "No email provided", unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["resident", "admin"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    phone: { type: String, default: "Phone is not provided" },
  },
  { timestamps: true }
);

//Custom Method
userSchema.methods.validatePassword = async function <T extends string>(
  plainPassword: T,
  email: T
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result && email === this.email;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //isModified is a mongoose method to check if the field is modified since the last save
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = model<IUser>("User", userSchema);

export { UserModel, userSchema };
