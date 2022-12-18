import { Router } from "express";
import { check } from "express-validator";
import { loginUser, googleSignIn } from "../controllers/auth.controller.js";
import { validateFields, validateGoogleToken } from "../middlewares/index.js";

const authRoutes = Router();

const middlewares = {
  login: [
    check("email", "Bad request - email is required").not().isEmpty(),
    check("email", "Bad request - email not valid").isEmail(),
    check("password", "Bad request - password is required").not().isEmpty(),
    validateFields,
  ],
  google: [
    check("id_token", "Bad request - token is required").not().isEmpty(),
    validateGoogleToken,
    validateFields,
  ],
};

authRoutes.post("/login", middlewares.login, loginUser);
authRoutes.post("/google", middlewares.google, googleSignIn);

export default authRoutes;
