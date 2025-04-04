import { NextFunction, Request, Response } from "express";
import { DEFAULT_REDIS_QUEUE } from "../../constants";
import redisConnection from "../../config/redis";
import QueueProducer from "../../queue/producer";
import { CustomRequest, HttpStatus } from "../../types/http";
import { HttpException } from "../../utils/http";
import { AccountStatus } from "../../types/account";
import { AccountModel } from "../../models/account";

async function changePasswordHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { sub } = (req as CustomRequest).user;
  const { oldPassword, newPassword } = req.body;

  try {
    const queueProducer = new QueueProducer(
      redisConnection,
      DEFAULT_REDIS_QUEUE
    );

    const user = await AccountModel.findById(sub);

    if (!user) {
      throw new HttpException(HttpStatus.NotFound, "account not found");
    }

    if (user.status !== AccountStatus.Active) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "account not active. Please verify account"
      );
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "Old password is incorrect"
      );
    }

    user.password = newPassword;
    await user.save();

    // Add job to queue
    queueProducer.addJob({
      name: "send-change-password-email",
      data: {
        recipientEmail: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    res.json({
      message: "Password changed",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export default changePasswordHandler;
