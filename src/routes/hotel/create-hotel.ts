import express from "express";
import multer from "multer";
import protectMiddleware from "../../middlewares/protect";
import roleMiddleware from "../../middlewares/role";
import { AccountRole } from "../../types/account";
import createHotelHandler from "../../handlers/hotel/create-hotel";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @description Endpoint to create a hotel
 * @route /v1/hotel
 * @access Private
 * @method POST
 */
router.post(
  "/",
  protectMiddleware,
  roleMiddleware([AccountRole.Vendor, AccountRole.Admin]),
  upload.fields([{ name: "images" }]),
  createHotelHandler
);

export default router;
