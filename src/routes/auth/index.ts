import express from "express";
const router = express.Router();

import loginRoute from "./login";
import registerRoute from "./register";
import validateOtpRoute from "./verify-otp";
import resendOtpRoute from "./resend-otp";
import forgotPasswordRoute from "./forgot-password";
import resetPasswordRoute from "./reset-password";
import logoutRoute from "./logout";
import changePasswordRoute from "./change-password";

router.use(loginRoute);
router.use(registerRoute);
router.use(validateOtpRoute);
router.use(resendOtpRoute);
router.use(forgotPasswordRoute);
router.use(resetPasswordRoute);
router.use(logoutRoute);
router.use(changePasswordRoute);

export default router;
