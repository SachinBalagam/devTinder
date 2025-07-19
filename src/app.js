import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./database/database.js";
import { authrouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestRouter } from "./routes/request.js";
import { userRouter } from "./routes/user.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/", authrouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

(async () => {
  try {
    await dbConnect();
    app.listen(process.env.PORT, () =>
      console.log(`Listening to port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log("Not able to connect");
  }
})();
