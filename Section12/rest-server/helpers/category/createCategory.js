import { Category } from "../../models/index.js";

export const createCategory = async (data) => {
  const newCategory = new Category(data);
  await newCategory.save();
  return newCategory;
};
