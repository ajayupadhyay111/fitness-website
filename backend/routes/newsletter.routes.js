import express from "express";
import AdminAuth from "../middleware/adminAuth.js";
import subscribeController from "../controllers/newsletter/subscribe.js";
import getSubscribersController from "../controllers/newsletter/getSubscribers.js";
import deleteNewsletterController from "../controllers/newsletter/deleteNewsletter.js";
const router = express.Router();

router.post("/subscribe", subscribeController);
router.get("/", AdminAuth, getSubscribersController);
router.delete("/:id", AdminAuth, deleteNewsletterController);

export default router;
