import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true, // used to make fields searchable
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //"password" is defined is userSchema
    //Without this condn: Every time we update a user's username or email, the server would take the already-hashed password and hash it again. You would be locked out of your account because the password would be double-scrambled!
    this.password = await bcrypt.hash(this.password, 10);
  }

  // next();
});

//isModifies is builtin mongoose method that checks if specific field has been changed since the last time the document was loaded from the database.

//pre hook to execute something just before data is send to the database
//run just before data is saved

userSchema.methods.isPasswordCorrect = async function (password) {
  //we made a custom method (function) to check for passwords
  return await bcrypt.compare(password, this.password);
  // password: plain text entered by user
  // this.password: hashed password stored in the database
};

userSchema.methods.generateAccessToken = function () {
  //we made a custom method (function) to generate accesstoken
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;

// Refresh token is stored for long-term login.
