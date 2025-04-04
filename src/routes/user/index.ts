import express from "express";
import getMeRoute from "./get-me";

const router = express.Router();

router.use(getMeRoute);

export default router;
