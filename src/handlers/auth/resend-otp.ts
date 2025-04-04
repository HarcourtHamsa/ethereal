import { NextFunction, Request, Response } from "express";
import QueueProducer from "../../queue/producer";
import redisConnection from "../../config/redis";
import { DEFAULT_REDIS_QUEUE } from "../../constants";
import { AccountModel } from "../../models/account";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";

async function resendOtpHandler(
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
    }).select("-password");

    if (!user) {
      throw new HttpException(HttpStatus.NotFound, "account not found");
    }

    var otp = await user.generateOtp();

    // Add job to queue
    queueProducer.addJob({
      name: "send-welcome-email",
      data: {
        otp: otp,
        recipientEmail: user.emailAddress,
        firstName: user.firstName,
        lastName: user.firstName,
      },
    });

    res.json({
      message: "Otp generated",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export default resendOtpHandler;
