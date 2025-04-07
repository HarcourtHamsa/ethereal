import express from "express";
import getRoomHandler from "../../handlers/room/get-room";

const router = express.Router();

/**
 * @description Endpoint to get a room
 * @route /v1/room/:id
 * @access Public
 * @method GET
 */
router.get("/:id", getRoomHandler);

export default router;
