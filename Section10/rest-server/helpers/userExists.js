import User from "../models/user.js";

const userExists = async (email = "") => {
  return await User.findOne({ email });
};

export default userExists;
