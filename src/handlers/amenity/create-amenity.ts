import { NextFunction, Request, Response } from "express";
import { AmenityModel } from "../../models/amenity";
import { HttpStatus } from "../../types/http";

async function createAmenityHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, facility } = req.body;

    const amenity = await AmenityModel.create({
      name,
      facility,
    });

    res.status(HttpStatus.Created).json({
      message: "Amenity created successfully",
      data: amenity,
    });
  } catch (error) {
    next(error);
  }
}

export default createAmenityHandler;
