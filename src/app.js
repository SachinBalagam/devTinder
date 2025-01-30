// import { authVerification, userAuth } from "./middlewares/auth.js";
import { dbConnect } from "./database/database.js";
import { UserModel } from "./models/user.js";

import express from "express";
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, age, emailId } = req.body;
  const userObj = {
    firstName,
    age,
    emailId,
  };
  try {
    const user = new UserModel(userObj);
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    console.error("Error Message", err);
  }
});

//   const user = new UserModel({
//     firstName: "Sachin",
//     lastName: "Balagam",
//     emailId: "sachin@gmail.com",
//   });

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await UserModel.find({ emailId: userEmail });
    if (user.length >= 1) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong");
  }
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
