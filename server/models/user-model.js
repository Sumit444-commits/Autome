import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Basic regex validation
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
  } catch (error) {
    console.log("error failed to hash the password");
  }
});


userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password,this.password);
  } catch (error) {
    console.log("error failed to compare hash password",error);
  }
};

// Create the model
export const User = mongoose.model("User", userSchema);
