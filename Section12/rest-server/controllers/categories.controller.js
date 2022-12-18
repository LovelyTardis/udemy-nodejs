import { response, request } from "express";
import { findAllCategories } from "../helpers/category/findCategory.js";
import { createCategory as createCategoryDB } from "../helpers/category/index.js";

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

export const getCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "get category",
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

export const updateCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "update category",
  });
};

export const deleteCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "delete category",
  });
};
