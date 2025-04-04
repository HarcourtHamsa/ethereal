import express from "express";
import multer from "multer";
import protectMiddleware from "../../middlewares/protect";
import roleMiddleware from "../../middlewares/role";
import { AccountRole } from "../../types/account";
import createRoomHandler from "../../handlers/room/create-room";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @description Endpoint to create a room
 * @route /v1/room
 * @access Private
 * @method POST
 */
router.post(
  "/",
  protectMiddleware,
  roleMiddleware([AccountRole.Vendor, AccountRole.Admin]),
  upload.fields([{ name: "images" }]),
  createRoomHandler
);

export default router;
