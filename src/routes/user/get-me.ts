import express from "express";
import protectMiddleware from "../../middlewares/protect";
import getMeHandler from "../../handlers/user/get-me";

const router = express.Router();

router.get("/me", protectMiddleware, getMeHandler);

export default router;
