import express from "express";
import createRoomRoute from "./create-room";
import getRoomsRoute from "./get-rooms";
import getRoomRoute from "./get-room";

const router = express.Router();

router.use("/room", createRoomRoute);
router.use("/rooms", getRoomsRoute);
router.use("/room", getRoomRoute);

export default router;
