const express = require("express");

const app = express();
const { authUser, authAdmin } = require("./middlewares/auth");

app.use("/admin", authAdmin);

app.get("/admin/getData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted Successfully");
});

app.get("/user", authUser, (req, res) => {
  res.send("User Data Fetched");
});

app.post("/user/login", (req, res) => {
  res.send("User login Successfully");
});

app.get("/getUserdata", (req, res) => {
  try {
    throw new Error("ghjadkl;;sjhjsdgs");
    res.send("hello world");
  } catch {
    res.status(500).send("SOMETHING WENT WRONG");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
