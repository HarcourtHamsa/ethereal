import express from "express";
import protectMiddleware from "../../middlewares/protect";
import logoutHandler from "../../handlers/auth/logout";

const router = express.Router();

/**
 * @description Endpoint to logout
 * @route /v1/auth/logout
 * @access Private
 * @method POST
 */
router.post("/logout", protectMiddleware, logoutHandler);

export default router;
