import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import QueueProducer from "../../queue/producer";
import redisConnection from "../../config/redis";
import { DEFAULT_REDIS_QUEUE } from "../../constants";
import { AccountModel } from "../../models/account";
import { AccountRole } from "../../types/account";
import { RoleModel } from "../../models/role";

async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, emailAddress, password } = req.body;

  const queueProducer = new QueueProducer(redisConnection, DEFAULT_REDIS_QUEUE);

  try {
    // find user by email address or username
    const existingAccount = await AccountModel.findOne({
      emailAddress: emailAddress.toLowerCase(),
    }).select("-password -otp -otpExpire");

    // User with email already exists
    if (existingAccount) {
      throw new HttpException(
        HttpStatus.BadRequest,
        "account with email or username already exists"
      );
    }

    const userRole = await RoleModel.findOne({ name: AccountRole.User });

    const user = await AccountModel.create({
      firstName,
      lastName,
      emailAddress: emailAddress.toLowerCase(),
      password,
      role: userRole,
    });

    const otp = await user.generateOtp();

    // Add job to queue
    queueProducer.addJob({
      name: "send-welcome-email",
      data: {
        otp: otp,
        recipientEmail: user.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    res.status(HttpStatus.Created).json({
      message: "account created",
      data: {},
    });
  } catch (error) {
    next(error);
  }
}

export default registerHandler;
