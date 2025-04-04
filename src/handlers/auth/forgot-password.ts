import { NextFunction, Request, Response } from "express";
import QueueProducer from "../../queue/producer";
import redisConnection from "../../config/redis";
import { DEFAULT_REDIS_QUEUE } from "../../constants";
import { AccountModel } from "../../models/account";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { AccountStatus } from "../../types/account";

async function forgotPasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { emailAddress } = req.body;

  try {
    const queueProducer = new QueueProducer(
      redisConnection,
      DEFAULT_REDIS_QUEUE
    );

    const user = await AccountModel.findOne({
      emailAddress: emailAddress.toLowerCase(),
    }).select("-password -tokenExpire");

    if (!user) {
      throw new HttpException(HttpStatus.BadRequest, "account not found");
    }

    if (user.status !== AccountStatus.Active) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "account not active. please verify account"
      );
    }

    const otp = await user.generateOtp();

    // Add job to queue
    queueProducer.addJob({
      name: "send-forgot-password-email",
      data: {
        recipientEmail: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        otp: otp,
        id: user.id,
      },
    });

    res.json({
      message: "Email sent",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export default forgotPasswordHandler;
