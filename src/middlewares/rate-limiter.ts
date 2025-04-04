import rateLimit from "express-rate-limit";

// Define the rate limit for the OTP endpoint
export const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 3, // Limit each IP to 3 requests per windowMs
  message:
    "Too many OTP requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
