import mongoose, { Document, Schema, Types } from "mongoose";

enum VitalType {
  HEART_RATE = "HEART_RATE",
  TEMPERATURE = "TEMPERATURE",
}

export interface VITAL extends Document {
  userId: Types.ObjectId;
  username: string;
  vitalID: VitalType;
  value: number;
  deletedAt: Date | null;
}

const vitalSchema = new Schema<VITAL>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    vitalID: {
      type: String,
      enum: Object.values(VitalType),
      required: true,
    },
    value: {
      type: Number,
      required: true,
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

export const VitalModel = mongoose.model<VITAL>("Vital", vitalSchema);
