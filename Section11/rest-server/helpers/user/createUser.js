import User from "../../models/user.js";

const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

export default createUser;
