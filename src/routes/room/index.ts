import express from "express";
import createRoomRoute from "./create-room";
import getRoomsRoute from "./get-rooms";

const router = express.Router();

router.use("/room", createRoomRoute);
router.use("/rooms", getRoomsRoute);

export default router;
