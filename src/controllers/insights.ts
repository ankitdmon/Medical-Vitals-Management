import {
  errorResponse,
  failResponse,
  successResponse,
} from "../helper/response";
import { Request, Response } from "express";
import { CommandType } from "../validations/validation";
import {
  calculatePercentile,
  getPopulationValues,
  vitalValue,
} from "../services/aggregate";


export const aggregateVitals = async (req: Request, res: Response) => {
  try {
    const { command, username, vital_ids, start_timestamp, end_timestamp } =
      req.body;

    if (command === CommandType.AGGREGATE) {
      const aggregatePromises = vital_ids.map(async (vital_id: string) => {
        const average = await vitalValue(
          username,
          vital_id,
          start_timestamp,
          end_timestamp
        );
        return { [vital_id]: average };
      });

      const aggregates = Object.assign(
        {},
        ...(await Promise.all(aggregatePromises))
      );

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
    const { command, username, vital_id, start_timestamp, end_timestamp } =
      req.body;

    if (command !== CommandType.POPULATION_INSIGHT) {
      return failResponse(req, res, `Invalid command type ${command}`);
    }

    const populationValues = await getPopulationValues(
      vital_id,
      start_timestamp,
      end_timestamp
    );
    const userAverage = await vitalValue(
      username,
      vital_id,
      start_timestamp,
      end_timestamp
    );

    const percentile = calculatePercentile(userAverage, populationValues);

    return successResponse(req, res, {
      username,
      vital_id,
      start_timestamp,
      end_timestamp,
      insight: `Your ${vital_id} is in the ${percentile}th percentile.`,
    });
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};
