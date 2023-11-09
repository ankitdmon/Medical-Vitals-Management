import mongoose, { Document, Schema } from "mongoose";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface User extends Document {
  userName: string;
  age: number;
  gender: Gender;
  medicalConditions: string[];
  deletedAt: Date | null;
}

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },
    medicalConditions: {
      type: [String],
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model<User>("User", userSchema);
