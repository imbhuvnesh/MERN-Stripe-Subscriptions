import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    min: 6,
    max: 69,
  },
  stripeCustomerId: {
    type: String,
  },
  subscriptions: [],
});

const User = mongoose.model("User", userSchema);

export default User;
