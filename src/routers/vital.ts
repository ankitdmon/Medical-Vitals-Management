import express from "express";
import * as vitalCon from "../controllers/vital";
import { ValidationSource, validateSchema } from "../middleware/yup";
import {
  deleteVitalsSchema,
  editVitalSchema,
  getVitalsSchema,
  insertVitalSchema,
} from "../validations/validation";
import {
  DELETE_VITALS,
  EDIT_VITAL,
  GET_VITAL,
  INSERT_VITAL,
} from "../constants/endpoints";

const router = express.Router();

router.post(
  INSERT_VITAL,
  validateSchema(insertVitalSchema, ValidationSource.BODY),
  vitalCon.createVital
);

router.post(
  GET_VITAL,
  validateSchema(getVitalsSchema, ValidationSource.BODY),
  vitalCon.vitals
);

router.post(
  EDIT_VITAL,
  validateSchema(editVitalSchema, ValidationSource.BODY),
  vitalCon.updateVital
);

router.post(
  DELETE_VITALS,
  validateSchema(deleteVitalsSchema, ValidationSource.BODY),
  vitalCon.deleteVital
);

export default router;
