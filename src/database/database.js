import mongoose from "mongoose";

export const dbConnect = async () => {
  try{
    const URI = process.env.MONGO_URI;
    await mongoose.connect(URI);
    console.log("Connected to the Cluster")
  }catch(err){
    console.log("ERROR : "+ err.message)
  }
  
};
