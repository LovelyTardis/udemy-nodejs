import { Category } from "../../models/index.js";

export const findAllCategories = async (limit, from) => {
  const query = { state: true };

  return await Promise.all([
    Category.countDocuments(),
    Category.find(query).populate("user", "name").skip(from).limit(limit),
  ]);
};

export const findCategoryById = async (id) => {
  return await Category.findById(id).populate("user", "name");
};

export const findCategoryByName = async (name) => {
  return await Category.findOne({ name });
};
