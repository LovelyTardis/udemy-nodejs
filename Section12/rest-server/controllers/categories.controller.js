import { response, request } from "express";

import { Category } from "../models/index.js";
import {
  Create,
  Delete,
  FindAll,
  FindById,
  Update,
} from "../database/helpers/index.js";

export const getCategories = async (req = request, res = response) => {
  const { limit, from } = req.query;

  try {
    const [totalCategories, categories] = await FindAll(Category, {
      limit,
      from,
      populate: ["user", "name"],
    });

    res.json({
      message: "Categories found",
      totalCategories,
      entries: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while getting all categories",
    });
  }
};

export const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const category = await FindById(Category, { id });

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
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while getting a category",
    });
  }
};

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const dataToSave = {
    name,
    user: req.user._id,
  };

  try {
    const category = await Create(Category, dataToSave);

    res.status(201).json({
      message: `New ${category.name} category created`,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while creating a category",
    });
  }
};

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  try {
    const updatedCategory = await Update(Category, {
      id,
      updatedData: { name },
      populate: ["user", "name"],
    });

    res.json({
      message: `Category name updated to ${updatedCategory.name}`,
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while updating a category",
    });
  }
};

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Delete(Category, id);

    res.json({
      message: `Category with id ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while deleting a category",
    });
  }
};
