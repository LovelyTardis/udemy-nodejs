import { FindById } from "../database/helpers/findInDatabase.js";
import { Category, Role, Product, User } from "../models/index.js";

export const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`Role '${role}' is not a valid role.`);
};

export const emailExists = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`Email '${email}' is already registered.`);
};

export const existsInDatabase = async (Model, id = "") => {
  const exists = await FindById(Model, { id });
  if (!exists) throw new Error(`${Model.name} does not exist in the database.`);
  if (!exists.state)
    throw new Error(`That element is not active in the database.`);
};
