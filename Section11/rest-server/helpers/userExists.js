import User from "../models/user.js";

export const userExistsByEmail = async (email = "") => {
  return await User.findOne({ email });
};

export const userExistsById = async (id = "") => {
  return await User.findById(id);
};
