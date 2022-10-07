import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();

const SECRET = process.env.JWT_SECRET;
export const requireSignIn = async (req, res, next) => {
  const token = req.cookies.auth || req.headers.authorization;
  console.log('token: ', token);
  if (token) {
    jwt.verify(token, SECRET, async (err, decodedToken) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "Invalid token" });
      } else {
        const user = await User.findById(decodedToken._id);
        if (user) {
          req.user = user;
          next();
        }
      }
    });
  } else {
    req.user = null;
    return res.status(400).json({ message: "Login first" });
  }
};
