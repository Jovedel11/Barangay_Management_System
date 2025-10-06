import { Schema, model, Document } from "mongoose";

interface IUserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  civilStatus: "single" | "married" | "divorced" | "widowed";
  completeAddress: string;
  phoneNumber: string;
  email: string;
  emergencyContact: string;
  emergencyPhone: string;
  occupation: string;
  familyMember: string;
  isSenior: boolean;
  isPwd: boolean;
  isPregnant: boolean;
  isRegisteredVoter: boolean;
}

export interface IUserProfileDocument extends IUserProfile, Document {}

const UserProfileSchema: Schema = new Schema<IUserProfileDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      required: true,
    },
    civilStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
      required: true,
    },
    completeAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    emergencyPhone: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    familyMember: {
      type: String,
    },
    isSenior: {
      type: Boolean,
      default: false,
    },
    isPwd: {
      type: Boolean,
      default: false,
    },
    isPregnant: {
      type: Boolean,
      default: false,
    },
    isRegisteredVoter: {
      type: Boolean,
      default: false,
    }, 
  },
  {
    timestamps: true,
  }
);

export const BrgyResident = model<IUserProfileDocument>(
  "BrgyResident",
  UserProfileSchema
); 
