import { NextFunction, Request, Response } from "express";
import { AmenityFacility } from "../../types/amenity";
import { HttpException } from "../../utils/http";
import { HttpStatus } from "../../types/http";
import { AmenityModel } from "../../models/amenity";

async function getAmenitiesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { facility } = req.query;

    const isValidFacility = Object.values(AmenityFacility).includes(
      facility as AmenityFacility
    );

    if (!isValidFacility) {
      throw new HttpException(HttpStatus.BadRequest, "Invalid facility");
    }

    const amenities = await AmenityModel.find({
      facility,
    });

    res.status(HttpStatus.Ok).json({
      messsage: "Amenities retrieved successfully",
      data: amenities,
    });
  } catch (error) {
    next(error);
  }
}

export default getAmenitiesHandler;
