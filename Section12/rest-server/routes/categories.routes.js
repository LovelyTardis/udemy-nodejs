import { Router } from "express";
import { check } from "express-validator";
import {
  categoryExistsById,
  validateFields,
  validateJwt,
  validateRole,
  validateCategoryIfNotExists,
  validateCategoryUpdateBody,
  isDeletedCategory,
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
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom(categoryExistsById),
    validateFields,
  ],
  create: [
    validateJwt,
    check("name", "Bad request - name is required").not().isEmpty(),
    validateCategoryIfNotExists,
    validateFields,
  ],
  update: [
    validateJwt,
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom(categoryExistsById),
    validateCategoryUpdateBody,
    validateCategoryIfNotExists,
    validateFields,
  ],
  delete: [
    validateJwt,
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom(categoryExistsById),
    check("id").custom(isDeletedCategory),
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
