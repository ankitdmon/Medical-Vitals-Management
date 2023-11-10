import express from "express";
import * as userCon from "../controllers/user";
import { createUserSchema, getUserSchema } from "../validations/validation";
import { ValidationSource, validateSchema } from "../middleware/yup";

const router = express.Router();

router.post(
  "/user",
  validateSchema(createUserSchema, ValidationSource.BODY),
  userCon.createUser
);

router.get(
  "/user",
  validateSchema(getUserSchema, ValidationSource.BODY),
  userCon.getUser
);

export default router;
