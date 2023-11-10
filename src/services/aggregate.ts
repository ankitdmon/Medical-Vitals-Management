import { VitalModel } from "../models/vital";

export const calculatePercentile = (
  userValue: number,
  populationValues: number[]
): number => {
  const sortedValues = populationValues.sort((a, b) => a - b);
  const countBelowOrEqual = sortedValues.filter(
    (value) => value <= userValue
  ).length;
  const percentile = (countBelowOrEqual / sortedValues.length) * 100;
  return percentile;
};

export const vitalValue = async (
  username: string,
  vital_id: string,
  start_timestamp: Date,
  end_timestamp: Date
) => {
  const vitals = await VitalModel.aggregate([
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
  return vitals.length ? vitals[0].average : 0;
};

export const getPopulationValues = async (
  vital_id: string,
  start_timestamp: string,
  end_timestamp: string
) => {
  return (
    await VitalModel.find({
      vitalID: vital_id,
      timestamp: {
        $gte: new Date(start_timestamp),
        $lte: new Date(end_timestamp),
      },
      deletedAt: null,
    })
  ).map((value) => value.value);
};
