import mongoose, { Document, Schema } from "mongoose";

enum VitalType {
  HEART_RATE = "HEART_RATE",
  TEMPERATURE = "TEMPERATURE",
}

export interface VITAL extends Document {
  //   userId: Types.ObjectId;
  userName: string;
  vitalID: VitalType;
  value: number;
  timestamp: Date;
  deletedAt: Date | null;
}

const vitalSchema = new Schema<VITAL>(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    userName: {
      type: String,
      ref: "User",
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
    timestamp: {
      type: Date,
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
