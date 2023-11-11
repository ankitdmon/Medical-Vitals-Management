import express from "express";
import * as insightCon from "../controllers/insights";
import { ValidationSource, validateSchema } from "../middleware/yup";
import {
  aggregateSchema,
  populationInsightSchema,
} from "../validations/validation";
import { AGGREGATE, POPULATE } from "../constants/endpoints";

const router = express.Router();

router.post(
  AGGREGATE,
  validateSchema(aggregateSchema, ValidationSource.BODY),
  insightCon.aggregateVitals
);

router.post(
  POPULATE,
  validateSchema(populationInsightSchema, ValidationSource.BODY),
  insightCon.populationInsight
);

export default router;
