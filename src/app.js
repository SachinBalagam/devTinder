const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: req.query });
});

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send({ firstName: req.params });
});

app.get("/ab?c", (req, res) => {
  res.send({ firstName: "Sachin", lastName: "Balagam" });
});

app.use("/test", (req, res) => {
  res.send("test from server /test");
});

app.listen(7777, () => console.log("listening to port 7777"));
