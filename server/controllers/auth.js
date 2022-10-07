import { comparePassword, createJwtToken, hashPassword } from "../helpers/auth";
import User from "../models/user";

import { stripe } from "../helpers/config/stripe";

export const register = async function (req, res, next) {
  try {
    const { data } = req.body;
    const { name, email, password } = data;
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password) {
      return res.json({ error: "Password is required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "Email already taken" });
    }

    const hashedPassword = await hashPassword(password);

    //stripe customer creation
    const customer = await stripe.customers.create({
      email,
    });

    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        stripeCustomerId: customer.id,
      });
      user.save();

      const { password, ...rest } = user._doc;

      return res.json({ user: rest });
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

export const login = async function (req, res, next) {
  try {
    const { data } = req.body;
    const { email, password } = data;

    //find user
    const user = await User.findOne({ email });
    if (user == null) {
      return res.json({ error: "Email not registered!" });
    }

    //check password
    const isPasswordSame = await comparePassword(password, user.password);

    if (!isPasswordSame) {
      return res.json({ error: "Invalid credenetials" });
    }

    //create signed token
    const token = createJwtToken(user._id);

    //set cookie
    res.cookie("auth", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    const { password: userPassword, ...rest } = user._doc;

    return res.json({ user: rest, token });
  } catch (err) {
    console.error(err);
  }
};

export const logout = async function (req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ message: "Logged out!" });
  console.log("logged out!");
};
