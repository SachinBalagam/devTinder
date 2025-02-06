import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";
import { validateSignup, validateLogin } from "../utils/validators.js";

export const authrouter = express.Router();

authrouter.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    about,
    photoUrl,
    skills,
  } = req.body;
  try {
    validateSignup(req);
    const hashPassword = await bcrypt.hash(password, 10);
    const userObj = {
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age,
      gender,
      about,
      photoUrl,
      skills,
    };
    const user = new UserModel(userObj);
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(401).send(err.message);
  }
});

authrouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    validateLogin(req);
    const user = await UserModel.findOne({ emailId });
    if (user) {
      const isValid = await user.validPassword(password);
      if (isValid) {
        const token = await user.getJWT();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          httpOnly: true,
        });
        res.json({ message: "User Logged Successfully", data: user });
      } else {
        res.status(401).send("Invalid Credentials");
      }
    } else {
      res.status(404).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});

authrouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Logout Successful");
});
