import { Router } from "express";
import { check } from "express-validator";

import { search } from "../controllers/index.js";
import validateFields from "../middlewares/validateFields.js";

const searchRoutes = Router();

const middlewares = {
  search: [
    check("collection", "Collection is required").not().isEmpty(),
    check("term", "Term is required").not().isEmpty(),
    validateFields,
  ],
};

searchRoutes.get("/:collection/:term", middlewares.search, search);

export default searchRoutes;
