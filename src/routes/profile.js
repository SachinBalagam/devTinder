import express from "express";
import bcrypt from "bcrypt";
import { userAuth } from "../middlewares/auth.js";
import {validateProfileEditData,validateOldPassword,validateNewPassword} from '../utils/validators.js'


export const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.send(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
  try{
    if(!validateProfileEditData(req)){
      throw new Error("Invalid Edit Request")
    }
    const loggedInUser = req.user 
    
    Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key])
    await loggedInUser.save()
    
    res.json({"message":`${loggedInUser.firstName}, Your profile updated successfully`,data:loggedInUser })
    

  }catch(err){
    res.status(401).send("ERROR : "+ err.message)
  }
})

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
  try{
    await validateOldPassword(req)
    await validateNewPassword(req)
    const newHashPassword = await bcrypt.hash(req.body.newPassword, 10)
    const loggedInUser = req.user 
    loggedInUser.password = newHashPassword 
    await loggedInUser.save()
    res.send("Password Changed Successfully")
    

  }catch(err){
    res.status(401).send("ERROR : "+err.message)
  }
})