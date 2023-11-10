import express from "express";
import * as insightCon from "../controllers/insights";
import { ValidationSource, validateSchema } from "../middleware/yup";
import {
  aggregateSchema,
  populationInsightSchema,
} from "../validations/validation";

const router = express.Router();

router.get(
  "/aggregate",
  validateSchema(aggregateSchema, ValidationSource.BODY),
  insightCon.aggregateVitals
);

router.get(
  "/populate",
  validateSchema(populationInsightSchema, ValidationSource.BODY),
  insightCon.populationInsight
);

export default router;
