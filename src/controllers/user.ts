import { Request, Response } from "express";
import {
  errorResponse,
  failResponse,
  successResponse,
} from "../helper/response";
import { userModel } from "../models/user";
import { CommandType } from "../validations/validation";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, age, command, gender } = req.body;
    if (command === CommandType.CREATE_USER) {
      const user = await userModel.create({ userName, age, gender });
      return successResponse(req, res, user, `User ${userName} created.`);
    } else {
      return failResponse(req, res, `Invalid command type ${command}`);
    }
  } catch (err) {
    return errorResponse(req, res, err as Error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userName = req.params.userName;
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
