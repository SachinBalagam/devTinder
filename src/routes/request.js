import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { UserModel } from "../models/user.js";
import { connectionRequestModel } from "../models/connectionRequest.js";

export const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //   if (fromUserId.equals(toUserId)) {
      //     throw new Error("Cannot send request to yourself");
      //   }

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status Type");
      }

      const toUser = await UserModel.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }

      const exsistingConnectionRequest = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (exsistingConnectionRequest) {
        throw new Error("Request Already Sent");
      }

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: `${req.user.firstName} ${status} ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status Type");
      }
      const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("Request not found");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: `Request ${status}`, data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);
