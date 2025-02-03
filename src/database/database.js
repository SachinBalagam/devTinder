import mongoose from "mongoose";

export const dbConnect = async () => {
  try{
    await mongoose.connect(
      "mongodb+srv://SachinBalagam:eUANgbzhD1T7Htno@namastenode.rs16p.mongodb.net/devTinder"
    );
    console.log("Connected to the Cluster")
  }catch(err){
    console.log("ERROR : "+ err.message)
  }
  
};
