import { response, request } from "express";
import {
  createCategory as createCategoryDB,
  findAllCategories,
  findCategoryById,
  findCategoryAndUpdate,
} from "../helpers/category/index.js";

export const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [totalCategories, categories] = await findAllCategories(limit, from);

  res.json({
    message: "Categories found",
    totalCategories,
    entries: categories.length,
    categories,
  });
};

export const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await findCategoryById(id);

  if (!category)
    return res.status(400).json({
      message: "Bad request - category does not exist",
    });

  if (!category.state)
    return res.status(400).json({
      message: "Bad request - category not active",
    });

  res.json({
    message: "Category found",
    category,
  });
};

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const dataToSave = {
    name,
    user: req.user._id,
  };

  try {
    const category = await createCategoryDB(dataToSave);
    res.status(201).json({
      message: `New ${category.name} category created`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `ERROR: ${error}`,
    });
  }
};

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  const updatedCategory = await findCategoryAndUpdate(id, { name });

  res.json({
    message: `Category name updated to ${updatedCategory.name}`,
    updatedCategory,
  });
};

export const deleteCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "delete category",
  });
};
