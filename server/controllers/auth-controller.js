import { User } from "../models/user-model.js";

// *****************************************
//            User Registeration
// *****************************************
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({ message: "Email Already Exists" });
    } else {
      const user = await User.create({ name, email, password });
      // setting data in session
      req.session.isLoggedIn = true;
      req.session.userId = user._id;
      return res.status(201).json({
        message: "Account Created Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.error("🔥 Error in register controller:", error);
    res.status(500).json({ message: error.message });
  }
};

// *****************************************
//            User login
// *****************************************

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(400).json({ message: "Invaild Credentials" });
    } else {
      const verified = await userExists.comparePassword(password);
      if (verified) {
        // setting data in session
        req.session.isLoggedIn = true;
        req.session.userId = userExists._id;
        return res.status(201).json({
          message: "User LoggedIn Successfull",
          user: {
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
          },
        });
      } else {
        const status = 401;
        const message = "Fill the input properly";
        const extraDetails = "Invalid name or password";
        const error = {
          status: status,
          message: message,
          extraDetails: extraDetails,
        };
        next(error);
      }
    }
  } catch (error) {
    console.error("🔥 Error in login controller:", error);
    res.status(500).json({ message: error.message });
  }
};

// *****************************************
//            User logout
// *****************************************
export const logout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).json({ message: error.message });
    }
  });
  return res.status(200).json({ message: "logout successful" });
};

// *****************************************
//            verify user
// *****************************************
export const verifyUser = async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(400).json({ message: "Invaild User" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
