import express from "express";
import createHotelRoute from "./create-hotel";
import getHotelsRoute from "./get-hotels";

const router = express.Router();

router.use("/hotel", createHotelRoute);
router.use("/hotels", getHotelsRoute);

export default router;
