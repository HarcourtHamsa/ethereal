import { NextFunction, Response } from "express";
import { db } from "../../config/database";
import { HotelModel } from "../../models/hotel";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { RoomAvailability } from "../../types/room";
import { processFileUploads } from "../../utils/core";
import UploadService from "../../services/upload";
import { RoomModel } from "../../models/room";
import mongoose from "mongoose";

async function createRoomHandler(req: any, res: Response, next: NextFunction) {
  const { name, description, price, number, amenities, status, hotel } =
    req.body;

  const session = await db.startSession();
  const uploadService = new UploadService();

  try {
    session.startTransaction();

    if (
      !name ||
      !description ||
      !price ||
      !number ||
      !amenities ||
      !status ||
      !hotel
    ) {
      throw new HttpException(HttpStatus.BadRequest, "Missing required fields");
    }

    const hotelExists = await HotelModel.findById(hotel);

    if (!hotelExists) {
      throw new HttpException(HttpStatus.BadRequest, "Hotel not found");
    }

    const isValidStatus = Object.values(RoomAvailability).includes(status);

    if (!isValidStatus) {
      throw new HttpException(HttpStatus.BadRequest, "Invalid status provided");
    }

    if (amenities && amenities.length > 0) {
      for (const amenity of amenities) {
        const isValidId = mongoose.Types.ObjectId.isValid(amenity);

        if (!isValidId) {
          throw new HttpException(
            HttpStatus.BadRequest,
            `Invalid amenities provided`
          );
        }
      }
    }

    const uploadUrls = await processFileUploads(req.files, uploadService);

    const room = await RoomModel.create(
      [
        {
          name,
          description,
          price: parseFloat(price) * 100,
          number: number,
          amenities: JSON.parse(amenities),
          images: uploadUrls,
          status,
          hotel,
        },
      ],
      { session }
    );

    res.status(HttpStatus.Created).json({
      message: "Room created successfully",
      data: room,
    });

    await session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
}

export default createRoomHandler;
