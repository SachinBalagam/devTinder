// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: Number,
  },
});

export const UserModel = mongoose.model("User", userSchema);
