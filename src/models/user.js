// const mongoose = require("mongoose");
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
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
      validate(value) {
        const isValid = validator.isEmail(value);
        if (!isValid) {
          throw new Error("Invalid Email : " + value);
        }
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not valid gender type`,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        const isValid = validator.isStrongPassword(value);
        if (!isValid) {
          throw new Error("Invalid Password : " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    photoUrl: {
      type: String,
      validate(value) {
        const isValid = validator.isURL(value);
        if (!isValid) {
          throw new Error("Invalid URL : " + value);
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using the app",
    },
    skills: {
      type: [String],
      // validate: [
      //   {
      //     validator: function (value) {
      //       return value.length >= 1 && value.length <= 5;
      //     },
      //     message: "Skills should be between 1 and 5",
      //   },
      //   {
      //     validator: function (skills) {
      //       return new Set(skills).size === skills.length;
      //     },
      //     message: "No duplicates allowed",
      //   },
      //   {
      //     validator: function (skills) {
      //       return skills.every(
      //         (skill) => skill.length >= 3 && skill.length <= 10
      //       );
      //     },
      //     message: "Each skill must be 3-10 characters long.",
      //   },
      // ],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const User = this;
  const token = await jwt.sign({ _id: User._id }, "@DevTinder$567", {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.validPassword = async function (userInputPassword) {
  const user = this;
  const isValid = await bcrypt.compare(userInputPassword, user.password);
  return isValid;
};

export const UserModel = mongoose.model("User", userSchema);
