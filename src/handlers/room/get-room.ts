import { NextFunction, Request, Response } from "express";
import { RoomModel } from "../../models/room";
import { HttpStatus } from "../../types/http";

async function getRoomHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const room = await RoomModel.findById(id).populate("amenities");

    res.status(HttpStatus.Ok).json({
      message: "Fetched room successfully",
      data: room,
    });
  } catch (error) {
    next(error);
  }
}

export default getRoomHandler;
