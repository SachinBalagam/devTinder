// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "Hey there! I am using the app",
  },
  skills: {
    type: [String],
  },
});

export const UserModel = mongoose.model("User", userSchema);
