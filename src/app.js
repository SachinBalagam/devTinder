const express = require("express");

const app = express();

app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("1st Response ");
      // res.send({ firstName: "1st Response" });
      next();
    },
    (req, res, next) => {
      console.log("2nd Response");
      next();
    },
  ],
  (req, res, next) => {
    console.log("3rd Response");
    next();
  },
  (req, res) => {
    console.log("4th Response");
    res.send("4th Response");
  }
);

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
