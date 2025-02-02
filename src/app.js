// import { authVerification, userAuth } from "./middlewares/auth.js";
import { dbConnect } from "./database/database.js";
import { UserModel } from "./models/user.js";
import { validateSignup, validateLogin } from "./utils/validators.js";
import { userAuth } from "./middlewares/auth.js";
import bcrypt from "bcrypt";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    validateLogin(req);
    const user = await UserModel.findOne({ emailId });
    if (user) {
      const isValid = await user.validPassword(password);
      if (isValid) {
        const token = await user.getJWT();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        res.send("User Logged Successfully");
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

app.get("/profile", userAuth, async (req, res) => {
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

app.post("/sendConnection", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent the connection request");
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
