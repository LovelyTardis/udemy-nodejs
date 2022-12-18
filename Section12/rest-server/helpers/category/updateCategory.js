import { Category } from "../../models/index.js";

export const findCategoryAndUpdate = async (id, objectToSave) => {
  return await Category.findByIdAndUpdate(id, objectToSave).populate(
    "user",
    "name"
  );
};

export const deleteCategory = async (id) => {
  await Category.findByIdAndUpdate(id, { state: false });
};
