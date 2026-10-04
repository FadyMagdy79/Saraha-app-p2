import { connectDB } from "./common/db/mongoose.js";
import express from "express";
import userRouter from "./app/user/user.route.js";
import authRouter from "./app/auth/auth.route.js";
import messageRouter from "./app/message/message.route.js";
import { logger } from "./common/logger/logger.js";
import cors from "cors";

const app = express();
 app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

app.use((err, req, res, next) => {
 logger.error(err.message);

  if (err.isOperational === true) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
      
    });
  }

  return res.status(500).json({
    message: "Something went wrong",
    success: false,
  });
});

connectDB().then(() => {
  app.listen(3000, () => {
    logger.info("Server is running on port 3000");
  });
});
