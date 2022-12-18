import { Router } from "express";
import { check } from "express-validator";
import {
  categoryExistsById,
  validateFields,
  validateJwt,
  validateCategoryIfNotExists,
} from "../middlewares/index.js";

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const categoriesRoutes = Router();

const middlewares = {
  getCategory: [
    check("id", "Id is required.").not().isEmpty(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  create: [
    validateJwt,
    check("name", "Name is required.").not().isEmpty(),
    validateCategoryIfNotExists,
    validateFields,
  ],
  update: [],
  delete: [],
};

// PUBLIC
categoriesRoutes.get("/", getCategories);

// PUBLIC
categoriesRoutes.get("/:id", middlewares.getCategory, getCategory);

// PRIVATE - HAS VALID TOKEN
categoriesRoutes.post("/create", middlewares.create, createCategory);

// PRIVATE - HAS VALID TOKEN
categoriesRoutes.put("/update/:id", middlewares.update, updateCategory);

// ADMIN
categoriesRoutes.delete("/delete/:id", middlewares.delete, deleteCategory);

export default categoriesRoutes;
