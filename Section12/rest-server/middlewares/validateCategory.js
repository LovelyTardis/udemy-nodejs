import { request, response } from "express";
import { Category } from "../models/index.js";

export const validateCategoryIfNotExists = async (
  req = request,
  res = response,
  next
) => {
  const name = req.body.name.toUpperCase();

  const category = await Category.findOne({ name });
  if (category)
    return res.status(400).json({
      message: `Bad request - category with name ${name} already exists.`,
    });

  next();
};

export const validateCategoryUpdateBody = (
  req = request,
  res = response,
  next
) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({
      message: "Bad request - no name in body",
    });

  next();
};
