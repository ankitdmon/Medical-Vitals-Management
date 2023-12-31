import express from "express";
import * as userCon from "../controllers/user";
import { createUserSchema, getUserSchema } from "../validations/validation";
import { ValidationSource, validateSchema } from "../middleware/yup";
import { CREATE_USER, GET_USER } from "../constants/endpoints";

const router = express.Router();

router.post(
  CREATE_USER,
  validateSchema(createUserSchema, ValidationSource.BODY),
  userCon.createUser
);

router.post(
  GET_USER,
  validateSchema(getUserSchema, ValidationSource.BODY),
  userCon.getUser
);

export default router;
