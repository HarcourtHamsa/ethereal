import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { AccountStatus } from "../../types/account";
import { AccountModel } from "../../models/account";
import jwt from "jsonwebtoken";

async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const { emailAddress, password } = req.body;

  try {
    const user = await AccountModel.findOne({
      emailAddress,
    }).populate("role");

    if (!user) {
      throw new HttpException(HttpStatus.NotFound, "user with email not found");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new HttpException(HttpStatus.BadRequest, "invalid credentials");
    }

    const accountStatus = user.status as string;

    if (accountStatus !== AccountStatus.Active) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "account not active. Please verify account"
      );
    }

    const payload = {
      id: user._id,
      sub: user._id.toString(),
      email: user.emailAddress,
      role: (user.role as any).name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      data: {
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          role: (user.role as any).name,
          status: user.status,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export default loginHandler;
