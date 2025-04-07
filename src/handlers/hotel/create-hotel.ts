import { NextFunction, Response } from "express";
import { db } from "../../config/database";
import { AddressModel } from "../../models/address";
import { HotelModel } from "../../models/hotel";
import UploadService from "../../services/upload";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { processFileUploads } from "../../utils/core";
import { IAddress } from "../../types/address";
import mongoose from "mongoose";

const createHotelHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    description,
    contactInfo,
    starRating = 3,
    amenities,
  } = req.body;

  const session = await db.startSession();
  const uploadService = new UploadService();
  try {
    session.startTransaction();

    const hotelExists = await HotelModel.findOne({ name });

    if (hotelExists) {
      throw new HttpException(HttpStatus.BadRequest, "Hotel already exists");
    }

    if (amenities && amenities.length > 0) {
      for (const amenity of amenities) {
        const isValidId = mongoose.Types.ObjectId.isValid(amenity);

        if (!isValidId) {
          throw new HttpException(HttpStatus.BadRequest, "Invalid amenity");
        }
      }
    }

    const uploadUrls = await processFileUploads(req.files, uploadService);

    const { city, state, street, country } = JSON.parse(address) as IAddress;

    if (!city || !state || !street || !country) {
      throw new HttpException(HttpStatus.BadRequest, "Invalid address");
    }

    const hotelAddress = await AddressModel.create(JSON.parse(address));

    const hotel = await HotelModel.create({
      name,
      address: hotelAddress.id,
      description,
      contactInfo,
      starRating,
      amenities: JSON.parse(amenities),
      images: uploadUrls,
    });

    await session.commitTransaction();

    res.status(201).json({
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export default createHotelHandler;
