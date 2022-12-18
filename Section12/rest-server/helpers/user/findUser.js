import { User } from "../../models/index.js";

export const findAllUsers = async (limit, from) => {
  const query = { state: true };

  return await Promise.all([
    User.countDocuments(),
    User.find(query).skip(from).limit(limit),
  ]);
};

export const findUserByEmail = async (email = "") => {
  return await User.findOne({ email });
};

export const findUserById = async (id = "") => {
  return await User.findById(id);
};
