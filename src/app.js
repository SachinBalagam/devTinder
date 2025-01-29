// import { authVerification, userAuth } from "./middlewares/auth.js";
import { dbConnect } from "./database/database.js";
import { UserModel } from "./models/user.js";

import express from "express";
const app = express();

app.post("/signup", async (req, res) => {
  try {
    const userObj = {
      firstName: "Sachin Kumar",
      lastName: "Balagam",
      emailId: "sachin333@gmail.com",
    };
    const user = new UserModel(userObj);
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    console.error("Error Message", err);
  }

  //   const user = new UserModel({
  //     firstName: "Sachin",
  //     lastName: "Balagam",
  //     emailId: "sachin@gmail.com",
  //   });
});

(async () => {
  try {
    await dbConnect();
    console.log("Connected to the cluster");
    app.listen(7777, () => console.log("listening to port 7777"));
  } catch (error) {
    console.log("Not able to connect");
  }
})();
