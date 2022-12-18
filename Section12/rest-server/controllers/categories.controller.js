import { response, request } from "express";
import {
  findCategoryByName,
  createCategory as createCategoryDB,
} from "../helpers/category/index.js";

export const getCategories = (req = request, res = response) => {
  res.json({
    message: "get all categories",
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

  const category = await findCategoryByName(name);

  if (category) {
    return res.status(400).json({
      message: `Category ${category.name} already exists`,
    });
  }

  const dataToSave = {
    name,
    user: req.user._id,
  };

  try {
    await createCategoryDB(dataToSave);
  } catch (error) {
    return res.status(500).json({
      message: `ERROR: ${error}`,
    });
  }

  res.status(201).json({
    message: `New ${category.name} category created`,
  });
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
