import connectDB from "./db/index.js";
import app from "./app.js";
import { config } from "dotenv";
config();

connectDB()
  .then(() => {
    // If database connects successfully then start the express server
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });

//connectionInstance: When the connection succeeds, Mongoose returns an object containing details about that connection.

//ConnectDB is an async function that returns a promise. || Success-> .then() || Failure -> .catch()
