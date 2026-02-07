import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { config } from "dotenv";
config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // console.log(connectionInstance);
    console.log(
      `\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB connection error ", error);
    process.exit(1);
  }
};

export default connectDB;
