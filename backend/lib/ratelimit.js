import rateLimit from "express-rate-limit";

// General API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 15 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

// Auth Rate Limiter (STRICT)
export function authLimiter(message) {
  return rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // only 10 attempts
    message: {
      success: false,
      message: message,
    },
  });
}
