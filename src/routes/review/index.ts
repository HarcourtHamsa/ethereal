import express from "express";
import getReviewsRoutes from "./get-reviews";
import postReviewRoutes from "./post-review";

const router = express.Router();

router.use("/reviews", getReviewsRoutes);
router.use("/review", postReviewRoutes);

export default router;
