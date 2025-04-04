import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { AccountModel } from "../../models/account";

async function getMeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { sub } = (req as CustomRequest).user;

    const user = await AccountModel.findById(sub).select("-password");

    res.status(HttpStatus.Ok).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export default getMeHandler;
