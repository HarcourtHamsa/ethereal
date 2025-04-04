import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { ReviewModel } from "../../models/review";
import mongoose from "mongoose";

async function getReviewsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { hotel, user } = req.query;

    const filter: any = {};

    if (hotel) {
      filter.hotel = new mongoose.Types.ObjectId(hotel.toString());
    }

    if (user) {
      filter.user = new mongoose.Types.ObjectId(user.toString());
    }

    const reviews = await ReviewModel.find(filter).populate({
      path: "user",
      select: "firstName lastName",
    });

    res.status(HttpStatus.Created).json({
      message: "Review fetched successfully",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
}

export default getReviewsHandler;
