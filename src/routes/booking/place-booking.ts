import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import placeBookingHandler from "../../handlers/booking/place-booking";
import protectMiddleware from "../../middlewares/protect";

const router = express.Router();

const validateRequest = () => {
  return [
    body("room").notEmpty().withMessage("Room is required"),
    body("checkInDate").notEmpty().withMessage("Check in date is required"),
    body("checkOutDate").notEmpty().withMessage("Check out date is required"),
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
 * @description Endpoint to place a booking
 * @route POST /api/user/booking
 * @access Private
 */
router.post(
  "/booking",
  protectMiddleware,
  validateRequest(),
  placeBookingHandler
);

export default router;
