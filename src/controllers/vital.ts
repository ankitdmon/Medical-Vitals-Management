import { Request, Response } from "express";
import {
  errorResponse,
  failResponse,
  successResponse,
} from "../helper/response";
import { CommandType } from "../validations/validation";
import { userModel } from "../models/user";
import { VitalModel } from "../models/vital";

export const createVital = async (req: Request, res: Response) => {
  try {
    const { command, userName, vitalID, value, timestamp } = req.body;
    if (command === CommandType.INSERT_VITAL) {
      const user = await userModel.findOne({
        userName: userName,
        deletedAt: null,
      });
      if (user) {
        const vital = await VitalModel.create({
          userName,
          vitalID,
          value,
          timestamp,
        });
        return successResponse(req, res, vital, "Vital Added");
      } else {
        return failResponse(req, res, `${userName} is not found,.`);
      }
    } else {
      return failResponse(req, res, `Invalid command type ${command}`);
    }
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};

export const vitals = async (req: Request, res: Response) => {
  try {
    const { command, userName, period } = req.body;
    if (command === CommandType.GET_VITALS) {
      const startDate = new Date(period[0]);
      const endDate = new Date(period[1]);
      const vitals = await VitalModel.find({
        userName: userName,
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
        deletedAt: null,
      }).select("vitalID value timestamp");
      return successResponse(req, res, vitals, `All vitals for ${userName}`);
    } else {
      return failResponse(req, res, `Invalid command type ${command}`);
    }
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};

export const updateVital = async (req: Request, res: Response) => {
  try {
    const { vitalID, timestamp, command, userName, newValue } = req.body;
    if (command === CommandType.EDIT_VITAL) {
      const result = await VitalModel.findOneAndUpdate(
        {
          userName: userName,
          vitalID: vitalID,
          timestamp: timestamp,
          deletedAt: null,
        },
        {
          $set: { value: newValue },
        },
        { new: true }
      );

      if (result) {
        return successResponse(
          req,
          res,
          result,
          `Vital for ${userName} updated successfully.`
        );
      } else {
        return failResponse(req, res, `Vital not found or already deleted.`);
      }
    } else {
      return failResponse(req, res, `Invalid command type ${command}`);
    }
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};

export const deleteVital = async (req: Request, res: Response) => {
  try {
    const { command, userName, vitalID, timestamp } = req.body;
    if (command === CommandType.DELETE_VITALS) {
      const vital = await VitalModel.findOneAndUpdate(
        {
          userName: userName,
          vitalID: vitalID,
          timestamp: timestamp,
          deletedAt: null,
        },
        {
          $set: { deletedAt: new Date() },
        },
        { new: true }
      );
      return successResponse(req, res, `Vital deleted for ${userName}.`);
    } else {
      return failResponse(req, res, `Invalid command type ${command}`);
    }
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};
