import express from "express";
import protectMiddleware from "../../middlewares/protect";
import getBookingsForUserHandler from "../../handlers/booking/get-user-bookings";

const router = express.Router();

/**
 * @description Endpoint to get bookings for a user
 * @route GET /v1/user/bookings
 * @access Private
 */
router.get("/bookings", protectMiddleware, getBookingsForUserHandler);

export default router;
