import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { AccountModel } from "../../models/account";
import { AccountStatus } from "../../types/account";

async function validateOtpHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { emailAddress, otp } = req.body;

  try {
    const user = await AccountModel.findOne({
      emailAddress: emailAddress.toLowerCase(),
    }).select("-password");

    if (!user) {
      throw new HttpException(HttpStatus.NotFound, "user with email not found");
    }

    const [isMatch, message] = await user.compareOtp(otp);

    if (!isMatch) {
      throw new HttpException(HttpStatus.BadRequest, message);
    }

    user.status = AccountStatus.Active;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.json({
      message: "Otp validated",
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

export default validateOtpHandler;
