import express from "express";
import getUserBookings from "./get-user-bookings";
import getVendorBookings from "./get-vendor-bookings";
import placeBooking from "./place-booking";

const router = express.Router();

router.use("/user", getUserBookings);
router.use("/vendor", getVendorBookings);
router.use("/user", placeBooking);

export default router;
