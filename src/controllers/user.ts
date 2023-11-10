import { Request, Response } from "express";
import {
  errorResponse,
  failResponse,
  successResponse,
} from "../helper/response";
import { userModel } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, age, command, gender } = req.body;
    const isValid = await userModel.findOne({
      userName: userName,
      deletedAt: null,
    });
    if (isValid) {
      return failResponse(req, res, `UserName ${userName} is already taken.`);
    }
    await userModel.create({ userName, age, gender });
    return successResponse(req, res, `User ${userName} created.`);
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userName = req.body.userName;
    const user = await userModel
      .findOne({
        userName: userName,
        deletedAt: null,
      })
      .select("-createdAt -deletedAt -updatedAt");
    return successResponse(req, res, user, `User ${userName} created.`);
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};
