import express from "express";
import getAmenitiesRoute from "./get-amenities";
import createAmenityRoute from "./create-amenity";

const router = express.Router();

router.use("/amenities", getAmenitiesRoute);
router.use("/amenity", createAmenityRoute);

export default router;
