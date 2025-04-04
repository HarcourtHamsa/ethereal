import express from "express";
import getHotelsHandler from "../../handlers/hotel/get-hotels";
const router = express.Router();

/**
 * @description Endpoint to get hotels
 * @route /v1/hotels
 * @access Public
 * @method POST
 */
router.get("/", getHotelsHandler);

export default router;
