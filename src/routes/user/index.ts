import express from "express";
import getMeRoute from "./get-me";
import updateProfileRoute from "./update-profile";

const router = express.Router();

router.use(getMeRoute);
router.use(updateProfileRoute);

export default router;
