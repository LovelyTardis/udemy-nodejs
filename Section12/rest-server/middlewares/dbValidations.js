import { Category, Role, User } from "../models/index.js";

export const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`Role '${role}' is not a valid role.`);
};

export const emailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`Email '${email}' is already registered.`);
};

export const userExistsById = async (id = "") => {
  const userExists = await User.findById(id);
  if (!userExists) throw new Error(`User with id '${id}' does not exist.`);
};

export const categoryExistsById = async (id = "") => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists)
    throw new Error(`Category with id '${id}' does not exist.`);
};
