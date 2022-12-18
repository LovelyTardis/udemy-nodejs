import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/index.js";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const categoriesRoutes = Router();

const middlewares = {
  getCategories: [],
  getCategory: [],
  create: [],
  update: [],
  delete: [],
};

// PUBLIC
categoriesRoutes.get("/", middlewares.getCategories, getCategories);

// PUBLIC
categoriesRoutes.get("/:id", middlewares.getCategory, getCategory);

// PRIVATE - HAS VALID TOKEN
categoriesRoutes.post("/create", middlewares.create, createCategory);

// PRIVATE - HAS VALID TOKEN
categoriesRoutes.put("/update/:id", middlewares.update, updateCategory);

// ADMIN
categoriesRoutes.delete("/delete/:id", middlewares.delete, deleteCategory);

export default categoriesRoutes;
