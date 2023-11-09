import { Request, Response } from "express";

export const successResponse = (
  req: Request,
  res: Response,
  data: object | string | null = {},
  message: string = "Success"
) => {
  res.send({
    status: "success",
    data,
    message,
  });
};

export const failResponse = (
  req: Request,
  res: Response,
  data = {},
  extra = {},
  status = 400,
  message = "Failure"
) => {
  res.status(status).send({
    status: "failure",
    data: null,
    message,
    errorData: data,
    extra,
  });
};

export const errorResponse = (
  req: Request,
  res: Response,
  errorDesc: Error,
  errorKey: string | null = "Error",
  resCode: number = 500
) => {
  console.log(">>>>>>>>>>>>> ERROR\n", errorDesc);

  res.status(resCode).send({
    status: "error",
    data: null,
    message: errorKey || errorDesc.message,
    errorData: {
      errorKey,
      errorDesc: errorDesc.message,
      errorMessage: errorDesc.message,
      errorStack: errorDesc.stack,
    },
  });
};
