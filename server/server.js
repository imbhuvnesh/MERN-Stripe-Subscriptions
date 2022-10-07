import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();

const app = express();

//route imports
import { authRoutes } from "./routes/auth";
import { subsRoutes } from "./routes/subs";

//db
const DB_URL = process.env.MONGODB_URL;
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("Connection Error", err));

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
  })
);

//routes
app.use(authRoutes);
app.use(subsRoutes);

//listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
