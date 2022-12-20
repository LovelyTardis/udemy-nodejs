import { Router } from "express";
import { check } from "express-validator";

import {
  validateFields,
  validateJwt,
  validateRole,
  validateCategoryIfNotExists,
  validateCategoryUpdateBody,
  existsInDatabase,
} from "../middlewares/index.js";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/index.js";
import { Category } from "../models/index.js";

const categoriesRoutes = Router();

const middlewares = {
  getCategory: [
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom((id) => existsInDatabase(Category, id)),
    validateFields,
  ],
  create: [validateJwt, validateCategoryIfNotExists, validateFields],
  update: [
    validateJwt,
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom((id) => existsInDatabase(Category, id)),
    validateCategoryUpdateBody,
    validateCategoryIfNotExists,
    validateFields,
  ],
  delete: [
    validateJwt,
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom((id) => existsInDatabase(Category, id)),
    validateRole("ADMIN_ROLE"),
    validateFields,
  ],
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
