import { Router } from "express";
import { check } from "express-validator";

import {
  validateFields,
  validateJwt,
  validateRole,
  isValidRole,
  emailExists,
  userExistsById,
} from "../middlewares/index.js";

import {
  getAllUsers,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/index.js";

const userRoutes = Router();

const middlewares = {
  updateUser: [
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom(userExistsById),
    check("email", "Bad request - email not valid").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  createUser: [
    check("name", "Bad request - name is required").not().isEmpty(),
    check(
      "password",
      "Bad request - password must have 6+ characters"
    ).isLength({
      min: 6,
    }),
    check("email", "Bad request - not an email").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  deleteUser: [
    validateJwt,
    validateRole("ADMIN_ROLE"),
    check("id", "Bad request - not a valid MongoDB id").isMongoId(),
    check("id").custom(userExistsById),
    validateFields,
  ],
};

userRoutes.get("/", getAllUsers);
userRoutes.put("/:id", middlewares.updateUser, updateUser);
userRoutes.post("/", middlewares.createUser, createUser);
userRoutes.delete("/:id", middlewares.deleteUser, deleteUser);
userRoutes.patch("/", patchUser);

export default userRoutes;
