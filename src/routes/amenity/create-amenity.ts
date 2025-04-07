import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { AmenityFacility } from "../../types/amenity";
import protectMiddleware from "../../middlewares/protect";
import roleMiddleware from "../../middlewares/role";
import { AccountRole } from "../../types/account";
import createAmenityHandler from "../../handlers/amenity/create-amenity";

const router = express.Router();

const validateRequest = () => {
  return [
    body("facility")
      .isIn(Object.values(AmenityFacility))
      .withMessage("Invalid facility"),
    body("name").notEmpty().withMessage("Name is required"),
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
 * @description Endpoint to create an amenity
 * @route POST /v1/amenity
 * @access Private
 */
router.post(
  "/",
  validateRequest(),
  protectMiddleware,
  roleMiddleware([AccountRole.Admin, AccountRole.Vendor]),
  createAmenityHandler
);

export default router;
