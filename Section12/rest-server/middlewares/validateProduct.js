import { request, response } from "express";
import { FindById, FindOne } from "../database/helpers/findInDatabase.js";
import { Product } from "../models/index.js";

export const validateProductIfNotExists = async (
  req = request,
  res = response,
  next
) => {
  const name = req.body.name.toUpperCase();

  const product = await FindOne(Product, { name });
  if (product)
    return res.status(400).json({
      message: `Bad request - product with name ${name} already exists.`,
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

// export const validateProductUpdateBody = (
//   req = request,
//   res = response,
//   next
// ) => {
//   const { name } = req.body;

//   if (!name)
//     return res.status(400).json({
//       message: "Bad request - no name in body",
//     });

//   next();
// };
