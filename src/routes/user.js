import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { connectionRequestModel } from "../models/connectionRequest.js";
import { UserModel } from "../models/user.js";

export const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInuser._id,
        status: "interested",
      })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "skills",
        "about",
        "gender",
      ]);
    // const usersData = await Promise.all(
    //   connectionRequest.map(async (each) => {
    //     const data = await UserModel.findById(each.fromUserId);
    //     return data;
    //   })
    // );

    res.json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    const connectionRequest = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedInuser._id, status: "accepted" },
          { toUserId: loggedInuser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId toUserId", [
        "firstName",
        "lastName",
        "photoUrl",
        "skills",
        "about",
        "gender",
      ]);

    const connections = connectionRequest.map((each) => {
      if (each.fromUserId._id.equals(loggedInuser._id)) {
        return each.toUserId;
      }
      return each.fromUserId;
    });

    res.json({ message: "Data fetched successfully", data: connections });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;

    const connections = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInuser._id }, { toUserId: loggedInuser._id }],
      })
      .select("fromUserId toUserId")
      .populate("fromUserId toUserId", ["firstName"]);

    const hideConnectionsFeed = new Set();
    connections.forEach((each) => {
      hideConnectionsFeed.add(each.fromUserId._id.toString());
      hideConnectionsFeed.add(each.toUserId._id.toString());
    });

    const users = await UserModel.find({
      $and: [
        { _id: { $ne: loggedInuser._id } },
        { _id: { $nin: Array.from(hideConnectionsFeed) } },
      ],
    })
      .select("firstName lastName about photoUrl skills gender age")
      .skip(skip)
      .limit(limit);

    res.json({ message: "Data fetched successfully", data: users });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
