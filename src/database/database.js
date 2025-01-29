import mongoose from "mongoose";

export const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://SachinBalagam:eUANgbzhD1T7Htno@namastenode.rs16p.mongodb.net/devTinder"
  );
};
