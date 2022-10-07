import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
export const stripe = Stripe(STRIPE_KEY);
