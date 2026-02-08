import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
//The server is configured to "watch" the public folder. When you use express.static("public"), any file inside public folder becomes accessible to the outside world via a URL.
app.use(cookieParser()); //to read and set cookies

//routes import
import userRouter from "./routes/user.routes.js";

//routes declearation
app.use("/api/v1/users", userRouter);
// http://localhost:8000/api/v1/users -> now give control to userRouter

export default app;
