import express from "express";
import { userAuth } from "../middlewares/auth.js";

export const requestRouter = express.Router();

requestRouter.post("/sendConnection", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent the connection request");
});
