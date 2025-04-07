import express, { NextFunction, Request, Response } from "express";
import getAmenitiesHandler from "../../handlers/amenity/get-amenities";
import { query, validationResult } from "express-validator";
import { AmenityFacility } from "../../types/amenity";

const router = express.Router();

const validateRequest = () => {
  return [
    query("facility")
      .isIn(Object.values(AmenityFacility))
      .withMessage("Invalid facility"),
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
 * @description Endpoint to get amenities
 * @route GET /v1/amenities
 * @access Public
 */
router.get("/", validateRequest(), getAmenitiesHandler);

export default router;
