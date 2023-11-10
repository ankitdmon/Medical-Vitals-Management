import express from "express";
import * as vitalCon from "../controllers/vital";
import { ValidationSource, validateSchema } from "../middleware/yup";
import {
  deleteVitalsSchema,
  editVitalSchema,
  getVitalsSchema,
  insertVitalSchema,
} from "../validations/validation";

const router = express.Router();

router.post(
  "/vital",
  validateSchema(insertVitalSchema, ValidationSource.BODY),
  vitalCon.createVital
);

router.get(
  "/vital",
  validateSchema(getVitalsSchema, ValidationSource.BODY),
  vitalCon.vitals
);

router.put(
  "/vital",
  validateSchema(editVitalSchema, ValidationSource.BODY),
  vitalCon.updateVital
);

router.delete(
  "/vital",
  validateSchema(deleteVitalsSchema, ValidationSource.BODY),
  vitalCon.deleteVital
);

export default router;
