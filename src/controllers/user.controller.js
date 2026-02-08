import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation (cheking if parameters are not empty)
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary
  // create user object - create entry in database
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;

  if (
    fullName?.trim() === "" ||
    email?.trim() === "" ||
    username?.trim() === "" ||
    password?.trim() === ""
  ) {
    throw new ApiError(400, "All Fields is required");
  }

  /*----------------------------------------------------------------*/

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  /*----------------------------------------------------------------*/

  const avatarLocalPath = req.files?.avatar[0]?.path; //by multer
  const coverImageLocalPath = req.files?.coverImage[0]?.path; //by multer

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  /*----------------------------------------------------------------*/

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  /*----------------------------------------------------------------*/

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  /*----------------------------------------------------------------*/

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export default registerUser;
