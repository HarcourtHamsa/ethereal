import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { AccountModel } from "../../models/account";

async function resetPasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, emailAddress } = req.body;

  try {
    const user = await AccountModel.findOne({
      emailAddress,
    }).select("-password");

    if (!user) {
      throw new HttpException(HttpStatus.BadRequest, "account not found");
    }

    user.password = password;
    await user.save();

    res.json({
      message: "Password reset successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export default resetPasswordHandler;
