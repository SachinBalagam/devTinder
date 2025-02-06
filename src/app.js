import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { dbConnect } from "./database/database.js";
import { authrouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestRouter } from "./routes/request.js";
import { userRouter } from "./routes/user.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/", authrouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

(async () => {
  try {
    await dbConnect();
    app.listen(7777, () => console.log("Listening to port 7777"));
  } catch (error) {
    console.log("Not able to connect");
  }
})();
