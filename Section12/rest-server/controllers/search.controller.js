import { request, response } from "express";

import { default as searchByTerm } from "../helpers/search.js";
import { User, Category, Product } from "../models/index.js";

const allowedCollections = ["users", "categories", "products", "roles"];

export const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection))
    return res.status(400).json({
      message: `${collection} is not an allowed collection`,
      allowedCollections,
    });

  const data = { term };
  switch (collection) {
    case "users":
      data.Model = User;
      break;
    case "categories":
      data.Model = Category;
      data.populate = ["user", "name"];
      break;
    case "products":
      data.Model = Product;
      data.populate = ["category", "name"];
      data.populate2 = ["user", "name"];
      break;
    default:
      return res.status(501).json({
        message: `Not implemented - ${collection} search`,
      });
  }
  await searchByTerm(res, data);
};
