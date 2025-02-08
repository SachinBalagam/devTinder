import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

export const userAuth = async (req, res, next) => {
  // Read the cookies from req
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("User not authorised");
    }
    // validate the token
    const decodedData = jwt.verify(token, "@DevTinder$567");
    const { _id } = decodedData;
    //find user
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User not authorised");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};
