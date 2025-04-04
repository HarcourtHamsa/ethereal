import express, { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";
import protectMiddleware from "../../middlewares/protect";
import changePasswordHandler from "../../handlers/auth/change-password";
const router = express.Router();

const validateRequest = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
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
 * @description Endpoint to change password
 * @route /v1/auth/change-password
 * @access Public
 * @method POST
 * @param {String} oldPassword
 * @param {String} newPassword
 */
router.post(
  "/change-password",
  validateRequest(),
  protectMiddleware,
  changePasswordHandler
);

export default router;
