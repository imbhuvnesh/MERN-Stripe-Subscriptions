import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error(err);
  }
};

export const comparePassword = async function (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const createJwtToken = function (id) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ _id: id }, secret, { expiresIn: "2d" });
  return token;
};
