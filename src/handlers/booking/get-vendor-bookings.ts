import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { BookingStatus } from "../../types/booking";
import { HttpException } from "../../utils/http";
import { BookingModel } from "../../models/booking";

async function getBookingsForVendorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { sub: hotel } = (req as CustomRequest).user;
  const {
    page = 1,
    limit = 10,
    sort = "desc",
    status,
    minDate,
    maxDate,
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);
  try {
    const filter: any = {};

    if (status) {
      const isValidStatus = Object.values(BookingStatus).includes(
        status as BookingStatus
      );

      if (!isValidStatus) {
        throw new HttpException(HttpStatus.BadRequest, "Invalid status");
      }

      filter.bookingStatus = status;
    }

    // Handle date filtering properly
    if (minDate || maxDate) {
      filter.checkInDate = {};

      if (minDate) {
        filter.checkInDate.$gte = new Date(minDate.toString());
      }

      if (maxDate) {
        filter.checkInDate.$lte = new Date(maxDate.toString());
      }
    }

    const bookings = await BookingModel.find({
      "room.hotel": hotel,
      ...filter,
    })
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await BookingModel.countDocuments({
      "room.hotel": hotel,
      ...filter,
    });

    res.status(HttpStatus.Ok).json({
      message: "Bookings retrieved successfully",
      data: {
        bookings,
        limit: Number(limit),
        page: Number(page),
        total,
      },
    });
  } catch (error) {
    next(error);
  }
}

export default getBookingsForVendorHandler;
