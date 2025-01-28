import { authVerification, userAuth } from "./middlewares/auth.js";
import express from "express";

const app = express();
// app.use(express.json());

app.use("/admin", authVerification);

app.get("/admin/getAllUserData", (req, res) => {
  res.send("All Data Send");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data fetched");
});

app.use("/test", (req, res) => {
  res.send("test from server /test");
});

app.listen(7777, () => console.log("listening to port 7777"));
