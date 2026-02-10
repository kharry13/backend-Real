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

/*
CORS = Cross-Origin Resource Sharing
It allows frontend (React) running on another port/domain to call backend.
Example:
Frontend: localhost:3000
Backend: localhost:8000
Without CORS, browser blocks requests.
*/

app.use(bodyParser.json({ limit: "16kb" })); //accecpt json data max:16kb
app.use(bodyParser.urlencoded({ extended: true, limit: "16kb" })); //accecpt json form data
app.use(express.static("public")); //Anything inside public/ folder is accessible from browser
app.use(cookieParser()); //to read and set cookies

//routes import
import userRouter from "./routes/user.routes.js";

//routes declearation
app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/users -> now give control to userRouter

export default app;

//We dont use app.use(multer) here because multer is only needed for requests that contain file uploads.
//Most requests do NOT upload files.
