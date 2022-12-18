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
      message: "Bad request - category already exists.",
    });

  next();
};
