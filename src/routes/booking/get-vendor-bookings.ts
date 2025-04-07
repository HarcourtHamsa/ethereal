import express from "express";
import protectMiddleware from "../../middlewares/protect";
import roleMiddleware from "../../middlewares/role";
import { AccountRole } from "../../types/account";
import getBookingsForVendorHandler from "../../handlers/booking/get-vendor-bookings";

const router = express.Router();

/**
 * @description Endpoint to get bookings for a vendor
 * @route GET /v1/vendor/booking
 * @access Private
 */
router.get(
  "/booking",
  protectMiddleware,
  roleMiddleware([AccountRole.Vendor]),
  getBookingsForVendorHandler
);

export default router;
