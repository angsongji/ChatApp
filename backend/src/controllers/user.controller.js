import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic)
      return res.status(400).json({ message: "Profile picture is required" });
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    if (!updatedUser) return res.status(400).json({ message: "Failed" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("error upload ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password -email"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error get users by full name:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
