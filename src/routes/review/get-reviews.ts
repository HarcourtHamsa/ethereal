import express from "express";
import getReviewsHandler from "../../handlers/review/get-reviews";
const router = express.Router();

/**
 * @description Endpoint to get reviews
 * @route /v1/review
 * @access Public
 * @method POST
 */
router.get("/", getReviewsHandler);

export default router;
