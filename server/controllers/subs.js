import dotenv from "dotenv";
dotenv.config();

import { stripe } from "../helpers/config/stripe";
import User from "../models/user";

const successUrl = process.env.STRIPE_SUCCESS_URL;
const cancelUrl = process.env.STRIPE_CANCEL_URL;

export const prices = async function (req, res, next) {
  const pricesData = await stripe.prices.list();
  const prices = pricesData.data.filter((price) => price.active === true);
  return res.json(prices.reverse());
};

export const createSubscription = async function (req, res, next) {
  // console.log(req.body);
  try {
    const userId = req.user._id;
    const { priceId } = req.body;
    const user = await User.findById(userId);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: user.stripeCustomerId,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    console.log("session: ", session);
    res.status(200).json(session.url);
  } catch (err) {
    console.error(err);
  }
};

export const getSubscriptionStatus = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscriptions: subscriptions.data,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
  }
};
export const getSubscriptions = async function (req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    });
    res.status(200).json(subscriptions);
  } catch (err) {
    console.error(err);
  }
};

export const customerPortal = async function (req, res) {
  try {
    const user = await User.findById(req.user._id);
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: successUrl,
    });

    return res.status(200).json(portalSession.url);
  } catch (err) {
    console.error(err);
  }
};
