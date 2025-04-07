import express from "express";
import protectMiddleware from "../../middlewares/protect";
import updateUserProfileHandler from "../../handlers/user/update-profile";

const router = express.Router();

router.patch("/profile", protectMiddleware, updateUserProfileHandler);

export default router;
