import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { failResponse } from "../helper/response";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

const sourceToProperty: Record<ValidationSource, string> = {
  [ValidationSource.BODY]: "body",
  [ValidationSource.HEADER]: "headers",
  [ValidationSource.QUERY]: "query",
  [ValidationSource.PARAM]: "params",
};

// Middleware to handle error validation for express
export const validateSchema = (
  schema: yup.ObjectSchema<any>,
  source: ValidationSource = ValidationSource.BODY
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await schema.validate(
        req[sourceToProperty[source] as keyof Request],
        {
          abortEarly: false,
        }
      );
      const updatedReq = { ...req, [sourceToProperty[source]]: data };
      Object.assign(req, updatedReq);
      next();
    } catch (error) {
      return failResponse(req, res, "Validation error");
    }
  };
};
