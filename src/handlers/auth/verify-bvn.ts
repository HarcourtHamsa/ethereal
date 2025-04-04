import { NextFunction, Request, Response } from "express";
import HTTPException from "../../utils/error.utils";
import { HTTPStatus } from "../../utils/http.utils";
import { UserModel } from "../../models/user.model";
import { BVNVerificationStatus } from "../../types/user.types";

async function verifyBvnHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bvn, emailAddress } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      emailAddress: emailAddress.toLowerCase(),
    }).select("-password -otp -otpExpire");

    if (!existingUser) {
      throw new HTTPException(HTTPStatus.BAD_REQUEST, "account does not exist");
    }

    if (existingUser.bvnVerificationStatus === BVNVerificationStatus.VERIFIED) {
      throw new HTTPException(HTTPStatus.BAD_REQUEST, "Bvn already verified");
    }

    if (existingUser.bvnVerificationStatus === BVNVerificationStatus.PENDING) {
      throw new HTTPException(
        HTTPStatus.BAD_REQUEST,
        "Bvn verification already in progress"
      );
    }

    existingUser.bvnVerificationStatus = BVNVerificationStatus.PENDING;
    existingUser.bvn = bvn;

    await existingUser.save();

    return res.status(HTTPStatus.OK).json({
      message: "Bvn verified initiated",
      data: {
        bvn: existingUser.bvn,
        bvnVerificationStatus: existingUser.bvnVerificationStatus,
      },
    });
  } catch (error) {
    next(error);
  }
}

export default verifyBvnHandler;
