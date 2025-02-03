import validator from "validator";
import bcrypt from 'bcrypt'

export const validateSignup = (req) => {
  const { firstName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("First Name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid Password");
  }
};

export const validateLogin = (req) => {
  const { emailId, password } = req.body;
  if (!emailId) {
    throw new Error("Email is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter Valid Email");
  } else if (!password) {
    throw new Error("Password is required");
  }
};


export const validateProfileEditData = (req)=>{
  const allowedEditFields = ["about","skills","gender","photoUrl","age","lastName"] 
  const isEditAllowed = Object.keys(req.body).every((key)=>allowedEditFields.includes(key));
  return isEditAllowed;
}

export const validateOldPassword = async (req)=>{
  const dbHashPassword = req.user.password
  const userGivenPassword = req.body.oldPassword
  if(!req.body.oldPassword || !req.body.newPassword){
    throw new Error("All Fields are required")
  }
  const isValidPassword = await bcrypt.compare(userGivenPassword,dbHashPassword)
  if(!isValidPassword){
    throw new Error("Invalid Old Password");    
  }
}

export const validateNewPassword = (req)=>{
  const userGivenNewPassword = req.body.newPassword 
  const isValidNewPassword = validator.isStrongPassword(userGivenNewPassword)
  if(!isValidNewPassword){    
    throw new Error("Invalid New Password"); 
  }
}