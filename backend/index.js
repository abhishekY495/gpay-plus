import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRoutes } from "./src/routes/userRoutes.js";
import { connectDB } from "./src/config/connectDB.js";
import { notFound } from "./src/middlewares/notFoundMiddleware.js";
import { errorHandler } from "./src/middlewares/errorHandlerMiddleware.js";
import {
  hitCount,
  requestCount,
} from "./src/middlewares/requestCountMiddleware.js";
import { rateLimit } from "./src/middlewares/rateLimitMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "PROD"
        ? process.env.CORS_ORIGIN
        : process.env.LOCAL_HOST,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(requestCount);
app.use(rateLimit);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Server is live", live: true });
});

app.get("/api/hits", (req, res) => {
  res.status(200).json({ count: hitCount });
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
