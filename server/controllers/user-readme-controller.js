import { Readme } from "../models/readme-model.js";
import { User } from "../models/user-model.js";

// *****************************************
//            get readmes data of user
// *****************************************
export const fetchUserReadmes = async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await User.findById(userId);
    if (user) {
      const userReadmes = await Readme.find({ userId });
      res.status(200).json({ userReadmes });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// *****************************************
//            get readme by Id
// *****************************************
export const fetchReadmeById = async (req, res) => {
  try {
    const { id } = req.params;
    const readme = await Readme.findById(id);
    res.status(200).json({ readme });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// *****************************************
//            update readme content
// *****************************************
export const updateReadme = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;
    const {source} = req.body.content
    const updatedReadme = await Readme.findOneAndUpdate(
      { _id: id, userId: userId }, // Security check
      { content: source },
      { new: true }, // Returns the modified document
    );

    if (!updatedReadme) {
      return res.status(404).json({ message: "Generation not found" });
    }

    res.status(200).json({
      message: "README updated successfully",
      data: updatedReadme,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// *****************************************
//            delete readme by Id
// *****************************************
export const deleteReadme = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId;

    const deletedReadme = await Readme.findOneAndDelete({
      _id: id,
      userId: userId,
    });

    if (!deletedReadme) {
      return res
        .status(404)
        .json({ message: "Readme not found or unauthorized" });
    }

    res.status(200).json({ message: "Generation deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
