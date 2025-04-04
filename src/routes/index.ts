import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import reviewRoutes from "./review";
import hotelRoutes from "./hotel";
import roomRoutes from "./room";

const router = express.Router();

// Include prefix
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

// Does not include prefix
router.use(reviewRoutes);
router.use(hotelRoutes);
router.use(roomRoutes);

export default router;
