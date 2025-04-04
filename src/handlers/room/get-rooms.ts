import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { RoomModel } from "../../models/room";

async function getRoomsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { page = 1, limit = 10, status, hotel } = req.query;
  try {
    const filter: any = {};

    const skip = (Number(page) - 1) * Number(limit);

    if (status) {
      filter.status = status;
    }

    if (hotel) {
      filter.hotel = new mongoose.Types.ObjectId(hotel.toString());
    }

    const [rooms, total] = await Promise.all([
      RoomModel.find(filter).skip(skip).limit(Number(limit)),
      RoomModel.countDocuments(filter),
    ]);

    res.status(200).json({
      message: "Rooms fetched successfully",
      data: {
        rooms,
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export default getRoomsHandler;
