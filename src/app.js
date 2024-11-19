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
  res.send("Test Test Test...");
});

app.use("/get", (req, res) => {
  res.send("Response from Test Server!!!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
