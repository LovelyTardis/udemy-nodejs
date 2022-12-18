import { Router } from "express";
import { check } from "express-validator";
import { loginUser, googleSignIn } from "../controllers/auth.controller.js";
import { validateFields, validateGoogleToken } from "../middlewares/index.js";

const authRoutes = Router();

const middlewares = {
  login: [
    check("email", "Email is required.").not().isEmpty(),
    check("email", "Email not valid.").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    validateFields,
  ],
  google: [
    check("id_token", "Token is required.").not().isEmpty(),
    validateGoogleToken,
    validateFields,
  ],
};

authRoutes.post("/login", middlewares.login, loginUser);
authRoutes.post("/google", middlewares.google, googleSignIn);

export default authRoutes;
