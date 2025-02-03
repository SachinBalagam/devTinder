import express from "express";
import { userAuth } from "../middlewares/auth.js";

export const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.send(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
});
