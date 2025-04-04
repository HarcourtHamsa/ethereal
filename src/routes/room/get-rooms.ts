import express, { NextFunction, Request, Response } from "express";
import { query, validationResult } from "express-validator";
import getRoomsHandler from "../../handlers/room/get-rooms";
const router = express.Router();

const validateRequest = () => {
  return [
    query("hotel").notEmpty().withMessage("Hotel is required"),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(errors.array());
      }

      return next();
    },
  ];
};

/**
 * @description Endpoint to get rooms
 * @route /v1/rooms
 * @access Public
 * @method POST
 */
router.get("/", validateRequest(), getRoomsHandler);

export default router;
