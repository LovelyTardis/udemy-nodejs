import { Router } from "express";
import { check } from "express-validator";
import { loginUser } from "../controllers/auth.controller.js";
import validateFields from "../middlewares/validateFields.js";

const authRoutes = Router();

const middlewares = {
  login: [
    check("email", "Email is required.").not().isEmpty(),
    check("email", "Email not valid.").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    validateFields,
  ],
};

authRoutes.post("/login", middlewares.login, loginUser);

export default authRoutes;
