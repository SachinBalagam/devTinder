import validator from "validator";

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
