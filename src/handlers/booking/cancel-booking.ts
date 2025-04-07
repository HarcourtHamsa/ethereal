import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { BookingModel } from "../../models/booking";
import { HttpException } from "../../utils/http";
import { BookingStatus } from "../../types/booking";

async function cancelBookingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { sub } = (req as CustomRequest).user;
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const booking = await BookingModel.findOneAndUpdate(
      {
        user: sub,
        _id: id,
      },
      {
        bookingStatus: BookingStatus.Cancelled,
        cancellationReason: reason,
      },
      { new: true }
    );

    if (!booking) {
      throw new HttpException(HttpStatus.NotFound, "Booking not found");
    }

    res.status(HttpStatus.Ok).json({
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}

export default cancelBookingHandler;
