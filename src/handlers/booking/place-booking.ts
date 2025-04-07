import { NextFunction, Request, Response } from "express";
import { CustomRequest, HttpStatus } from "../../types/http";
import { BookingModel } from "../../models/booking";
import { PaymentStatus } from "../../types/booking";
import { HttpException } from "../../utils/http";
import { RoomModel } from "../../models/room";
import { RoomAvailability } from "../../types/room";

async function placeBookingHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { sub } = (req as CustomRequest).user;
  const { room: roomId, checkInDate, checkOutDate } = req.body;
  try {
    const bookingExists = await BookingModel.findOne({
      room: roomId,
      checkInDate,
      paymentStatus: PaymentStatus.Paid,
    });

    if (bookingExists) {
      throw new HttpException(HttpStatus.Conflict, "Room already booked");
    }

    const room = await RoomModel.findById(roomId);

    if (!room) {
      throw new HttpException(HttpStatus.NotFound, "Room not found");
    }

    const roomIsAvailable = room.status === RoomAvailability.Available;

    if (!roomIsAvailable) {
      throw new HttpException(HttpStatus.Conflict, "Room is not available");
    }

    const booking = await BookingModel.create({
      user: sub,
      room: roomId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
    });

    res.status(HttpStatus.Ok).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
}

export default placeBookingHandler;
