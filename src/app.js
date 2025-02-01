// import { authVerification, userAuth } from "./middlewares/auth.js";
import { dbConnect } from "./database/database.js";
import { UserModel } from "./models/user.js";
import { validateSignup, validateLogin } from "./utils/validators.js";
import bcrypt from "bcrypt";
import express from "express";
const app = express();

app.use(express.json());

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
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
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

app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await UserModel.findOne({ emailId: userEmail });
    if (user) {
      await UserModel.findByIdAndDelete({ _id: user._id });
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const ALLOWED_UPDATES = [
      "emailId",
      "gender",
      "age",
      "about",
      "photoUrl",
      "skills",
    ];
    const isUpdates = Object.keys(req.body).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdates) {
      throw new Error("Invalid update");
    }
    const user = await UserModel.findOne({ emailId: userEmail });
    if (user) {
      const object = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        about: req.body.about,
        photoUrl: req.body.photoUrl,
        skills: req.body.skills,
      };
      await UserModel.findByIdAndUpdate({ _id: user._id }, object, {
        returnDocument: "after",
        runValidators: true,
      });
      res.send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Update Error:" + err.message);
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
