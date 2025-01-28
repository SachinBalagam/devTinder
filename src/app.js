import { authVerification, userAuth } from "./middlewares/auth.js";
import express from "express";

const app = express();
// app.use(express.json());

app.get("/getUserData", (req, res) => {
  try {
    console.log("Enter");
    throw new Error("false error");
    res.send("send Error");
  } catch (err) {
    res.status(404).send("Error Found");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send(500).send("something Went Wrong");
  }
});

app.listen(7777, () => console.log("listening to port 7777"));
