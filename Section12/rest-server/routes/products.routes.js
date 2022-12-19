import { Router } from "express";
import { check } from "express-validator";

const productsRoutes = Router();

const middlewares = {
  getCategory: [],
};

productsRoutes.get("/");

export default productsRoutes;
