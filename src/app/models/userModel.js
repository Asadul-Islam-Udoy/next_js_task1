import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    verifyToken: String,
    verifyTokenExpries: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
