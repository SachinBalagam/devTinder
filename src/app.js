const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Sachin", lastName: "Balagam" });
});

app.post("/user", (req, res) => {
  console.log("Data Saved");
  res.send("Data Saved successfully to the database");
});

app.delete("/user", (req, res) => {
  console.log("Deleted Successfully");
  res.send("Delted successfully from the database");
});

app.use("/test", (req, res) => {
  res.send("test from server /test");
});

app.listen(7777, () => console.log("listening to port 7777"));
