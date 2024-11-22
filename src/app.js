const express = require("express");

const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  // const userObj = {
  //   firstName: "Sachin",
  //   lastName: "Balagam",
  //   age: 27,
  //   emailId: "sachin@gmail.com",
  //   gender: "Male",
  //   password: "123456789",
  // };
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
