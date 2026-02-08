import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath); //fs.unlinkSync deletes the temporary file from your ./public/temp
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file if the upload operation fails
    return null;
  }
};

export default uploadOnCloudinary;

// localFilePath : jaha pe multer ne file save kari hai like /public/temp/img1.png
