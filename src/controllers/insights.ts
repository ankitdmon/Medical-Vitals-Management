import {
  errorResponse,
  failResponse,
  successResponse,
} from "../helper/response";
import { Request, Response } from "express";
import { CommandType } from "../validations/validation";
import { VitalModel } from "../models/vital";

export const aggregateVitals = async (req: Request, res: Response) => {
  try {
    const { command, username, vital_ids, start_timestamp, end_timestamp } =
      req.body;
    if (command === CommandType.AGGREGATE) {
      const aggregates: { [key: string]: number } = {};
      for (const vital_id of vital_ids) {
        const result = await VitalModel.aggregate([
          {
            $match: {
              userName: username,
              vitalID: vital_id,
              timestamp: {
                $gte: new Date(start_timestamp),
                $lte: new Date(end_timestamp),
              },
              deletedAt: null,
            },
          },
          {
            $group: {
              _id: null,
              average: { $avg: "$value" },
            },
          },
        ]);
        aggregates[vital_id] = result.length ? result[0].average : 0;
      }
      return successResponse(req, res, {
        username,
        aggregates,
        start_timestamp,
        end_timestamp,
      });
    } else {
      return failResponse(req, res, `Invalid command type ${command}`);
    }
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};

export const populationInsight = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};
