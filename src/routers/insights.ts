import express from "express";
import * as insightCon from "../controllers/insights";
import { ValidationSource, validateSchema } from "../middleware/yup";
import {
  aggregateSchema,
  populationInsightSchema,
} from "../validations/validation";
import { AGGREGATE, POPULATE } from "../validations/endpoints";

const router = express.Router();

router.get(
  AGGREGATE,
  validateSchema(aggregateSchema, ValidationSource.BODY),
  insightCon.aggregateVitals
);

router.get(
  POPULATE,
  validateSchema(populationInsightSchema, ValidationSource.BODY),
  insightCon.populationInsight
);

export default router;
