import express, { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";
import protectMiddleware from "../../middlewares/protect";
import postReviewHandler from "../../handlers/review/post-review";
const router = express.Router();

const validateRequest = () => {
  return [
    body("comment").notEmpty().withMessage("Comment is required"),
    body("hotel").notEmpty().withMessage("Hotel is required"),
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
 * @description Endpoint to post a review
 * @route /v1/review
 * @access Public
 * @method POST
 * @param {String} comment
 * @param {String} hotel
 */
router.post("/", validateRequest(), protectMiddleware, postReviewHandler);

export default router;
