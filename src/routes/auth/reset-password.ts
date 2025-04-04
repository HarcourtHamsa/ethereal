import express, { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";
import resetPasswordHandler from "../../handlers/auth/reset-password";
const router = express.Router();

const validateRequest = () => {
  return [
    body("emailAddress").notEmpty().withMessage("Email address is required"),
    body("otp").notEmpty().withMessage("Otp is required"),
    body("password").notEmpty().withMessage("Password is required"),

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
 * @description Endpoint for reset password
 * @route /v1/auth/reset-password
 * @access Public
 * @method POST
 * @param {String} emailAddress
 * @param {String} otp
 * @param {String} password
 */
router.post("/reset-password", validateRequest(), resetPasswordHandler);

export default router;
