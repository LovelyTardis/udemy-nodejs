import { request, response } from "express";
import { isValidObjectId } from "mongoose";

import { FindById, FindOne } from "../database/helpers/findInDatabase.js";
import { Category, Product } from "../models/index.js";

export const validateProductIfNotExists = async (
  req = request,
  res = response,
  next
) => {
  const name = req.body.name.toUpperCase();

  const product = await FindOne(Product, { filter: name });
  if (product)
    return res.status(400).json({
      message: `Bad request - product with name ${name} already exists.`,
    });

  next();
};

export const validateProductCategory = async (
  req = request,
  res = response,
  next
) => {
  const categoryId = req.body.category;

  if (!isValidObjectId(categoryId))
    return res.status(400).json({
      message: `Bad request - category id not valid.`,
    });

  const category = await FindById(Category, { id: categoryId });
  if (!category)
    return res.status(400).json({
      message: `Bad request - category does not exists.`,
    });

  next();
};

export const validateProductCreateBody = async (
  req = request,
  res = response,
  next
) => {
  const { name, category: id } = req.body;

  if (!id)
    return res.status(400).json({
      message: "Bad request - no category id in body",
    });

  if (!name)
    return res.status(400).json({
      message: "Bad request - no name in body",
    });

  const category = await FindById(Category, { id });

  if (!category)
    return res.status(400).json({
      message: "Bad request - no category in database",
    });

  req.category = category;

  next();
};

export const validateProductUpdateBody = (
  req = request,
  res = response,
  next
) => {
  const { name, category, ...rest } = req.body;
  const accepted = ["description", "stock", "price"];
  const restKeys = Object.keys(rest);

  if (!name)
    return res.status(400).json({
      message: "Bad request - no name in body",
    });

  let done = false;
  restKeys.every((key) => {
    if (!accepted.includes(key)) {
      done = true;
      return false;
    }
    return true;
  });

  if (done)
    return res.status(400).json({ message: `Bad request - body not valid` });

  next();
};
