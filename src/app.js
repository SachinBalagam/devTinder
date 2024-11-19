const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("Response from Test Server!!!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
