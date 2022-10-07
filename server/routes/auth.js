import express from "express";
import { register, login, logout } from "../controllers/auth";
import { requireSignIn } from "../middlewares";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", requireSignIn, logout);
export { router as authRoutes };
