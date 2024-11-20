const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Sachin", lastName: "Balagam" });
});

app.post("/user", (req, res) => {
  res.send("Full Data Updated Successfully");
});

app.patch("/user", (req, res) => {
  res.send("Data Updated Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data Deleted");
});

app.use("/test", (req, res) => {
  res.send("Test Test Test........");
});

app.use("/", (req, res, next) => {
  res.send("First use logged");
});

app.use("/dummy", (req, res, next) => {
  console.log("dummy text will be printed 2");
  res.send("Printed the dummy 2");
});

app.use("/dummy", (req, res, next) => {
  console.log("dummy text will be printed 1");
  next();
});

app.use(
  "/get",
  (req, res, next) => {
    console.log("Print some random text");
    next();
    // res.send("Response from Test Server!!!");
  },
  (req, res) => {
    console.log("Print some dummy text");
    res.send("Response from dummy server");
  }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

console.log("Test Synchronous things...");
