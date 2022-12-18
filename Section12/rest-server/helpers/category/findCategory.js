import { Category } from "../../models/index.js";

export const findCategoryByName = async (name) => {
  return await Category.findOne({ name });
};
