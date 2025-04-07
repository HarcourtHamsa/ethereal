import { NextFunction, Request, Response } from "express";
import { HotelModel } from "../../models/hotel";
import { getHotelsPipeline } from "./pipelines/get-hotels";

async function getHotelsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { page = 1, limit = 10, status, search, cordinates } = req.query;
  try {
    const filter: any = {};

    const skip = (Number(page) - 1) * Number(limit);

    const aggregation = getHotelsPipeline({
      skip,
      limit: Number(limit),
      status: status as any,
      name: search as any,
      cordinates: cordinates as any,
    });

    const [hotels, total] = await Promise.all([
      HotelModel.aggregate(aggregation),
      HotelModel.countDocuments(filter),
    ]);

    res.status(200).json({
      message: "Hotels fetched successfully",
      data: {
        hotels,
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export default getHotelsHandler;
