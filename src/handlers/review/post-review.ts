import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { ReviewModel } from "../../models/review";
import { HotelModel } from "../../models/hotel";
import { HttpException } from "../../utils/http";

async function postReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { comment, hotel, rating = 3 } = req.body;
    const { sub } = (req as CustomRequest).user;

    const hotelExists = await HotelModel.findById(hotel);

    if (!hotelExists) {
      throw new HttpException(HttpStatus.BadRequest, "Hotel not found");
    }

    const review = await ReviewModel.findOneAndUpdate(
      { user: sub, hotel },
      {
        comment,
        hotel,
        rating: parseFloat(rating),
        user: sub,
      },
      { new: true, upsert: true }
    );

    res.status(HttpStatus.Created).json({
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
}

export default postReviewHandler;
