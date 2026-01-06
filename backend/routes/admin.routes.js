import express from "express";
import registerController from "../controllers/admin/registerController.js";
import loginController from "../controllers/admin/loginController.js";
import refreshTokenController from "../controllers/admin/refreshTokenController.js";
import logoutController from "../controllers/admin/logoutController.js";
import meController from "../controllers/admin/meController.js";
import { authLimiter } from "../lib/ratelimit.js";
import AdminAuth from "../middleware/adminAuth.js";
import dashboardStatsController from "../controllers/admin/dashboardStats.js";

const router = express.Router();

router.post(
  "/register",
  authLimiter("Too many register attempts"),
  registerController
);

router.post(
  "/login",
  authLimiter("Too many login attempts, Please try after sometime."),
  loginController
);

router.post(
  "/refresh-token",
  authLimiter("Too many refresh token attempts"),
  refreshTokenController
);

router.post("/logout", AdminAuth, logoutController);

router.get("/me", AdminAuth, meController);

router.get("/dashboard", AdminAuth, dashboardStatsController);
// router.get("/recent-activity", AdminAuth, getRecentActivity);

export default router;
