const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://SachinBalagam:eUANgbzhD1T7Htno@namastenode.rs16p.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
