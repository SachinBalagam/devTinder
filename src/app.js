const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hi from server /");
});

app.use("/hello", (req, res) => {
  res.send("Hello from server /hello");
});

app.use("/test", (req, res) => {
  res.send("test from server /test");
});

app.listen(7777, () => console.log("listening to port 7777"));
