import { response, request } from "express";
import { Create, FindAll, FindById } from "../database/helpers/index.js";
import { Product } from "../models/index.js";

export const getProducts = async (req = request, res = response) => {
  const { limit, from } = req.query;

  try {
    const [totalProducts, products] = await FindAll(Product, {
      limit,
      from,
      populate: ["category", "name"],
      populate2: ["user", "name"],
    });

    res.json({
      message: "Products found",
      totalProducts,
      entries: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while getting all products",
    });
  }
};

export const getProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await FindById(Product, {
      id,
      populate: ["category", "name"],
      populate2: ["user", "name"],
    });

    if (!product)
      return res.status(400).json({
        message: "Bad request - product does not exist",
      });

    if (!product.state)
      return res.status(400).json({
        message: "Bad request - product not active",
      });

    res.json({
      message: "Product found",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while getting a product",
    });
  }
};

export const createProduct = async (req = request, res = response) => {
  const { name, category, ...rest } = req.body;

  const dataToSave = {
    ...rest,
    name: name.toUpperCase(),
    category: req.category._id,
    user: req.user._id,
  };

  try {
    const product = await Create(Product, dataToSave);

    res.status(201).json({
      message: `New ${product.name} product created`,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while creating a product",
    });
  }
};

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();

  try {
    const updatedCategory = await findCategoryAndUpdate(id, { name });
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

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await deleteCategoryDB(id);
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
