import express from "express";
import { createSubscription, customerPortal, getSubscriptions, getSubscriptionStatus, prices } from "../controllers/subs";
import { requireSignIn } from "../middlewares";

const router = express.Router();

router.get("/prices", prices);
router.post("/create-subscription", requireSignIn, createSubscription);
router.get("/subscription-status", requireSignIn, getSubscriptionStatus);
router.get("/subscriptions", requireSignIn, getSubscriptions);
router.get("/customer-portal", requireSignIn, customerPortal );

export { router as subsRoutes };
