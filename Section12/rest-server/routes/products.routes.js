import { Router } from "express";
import { check } from "express-validator";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/index.js";

import {
  validateFields,
  validateJwt,
  validateRole,
  validateProductCreateBody,
  // validateProductUpdateBody,
  existsInDatabase,
  validateProductIfNotExists,
} from "../middlewares/index.js";
import { Product } from "../models/index.js";

const productsRoutes = Router();

const middlewares = {
  getCategory: [
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom((id) => existsInDatabase(Product, id)),
    validateFields,
  ],
  create: [
    validateJwt,
    validateProductIfNotExists,
    validateProductCreateBody,
    // validateCategoryInProduct,
    validateFields,
  ],
  update: [
    validateJwt,
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom((id) => existsInDatabase(Product, id)),
    validateProductIfNotExists,
    // validateCategoryInProduct,
    // validateProductUpdateBody,
    validateFields,
  ],
  delete: [
    validateJwt,
    check("id", "Bad request - id is required").not().isEmpty(),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom((id) => existsInDatabase(Product, id)),
    validateRole("ADMIN_ROLE"),
    validateFields,
  ],
};

// PUBLIC
productsRoutes.get("/", getProducts);

// PUBLIC
productsRoutes.get("/:id", middlewares.getCategory, getProduct);

// PRIVATE - HAS VALID TOKEN
productsRoutes.post("/create", middlewares.create, createProduct);

// PRIVATE - HAS VALID TOKEN
productsRoutes.put("/update/:id", middlewares.update, updateProduct);

// ADMIN
productsRoutes.delete("/delete/:id", middlewares.delete, deleteProduct);

export default productsRoutes;
