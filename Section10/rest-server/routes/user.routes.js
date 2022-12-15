import { Router } from "express";
import { check } from "express-validator";

import validateFields from "../middlewares/validateFields.js";
import validateJwt from "../middlewares/validateJwt.js";
import {
  isValidRole,
  emailExists,
  userExistsById,
} from "../helpers/dbValidations.js";

import {
  getAllUsers,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRoutes = Router();

const middlewares = {
  updateUser: [
    check("id", "Is not a valid MongoDB id.").isMongoId(),
    check("id").custom(userExistsById),
    check("email", "The email is not valid.").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  createUser: [
    check("name", "The name is required.").not().isEmpty(),
    check("password", "The password must have 6 characters.").isLength({
      min: 6,
    }),
    check("email", "The email is not valid.").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    validateFields,
  ],
  deleteUser: [
    validateJwt,
    check("id", "Is not a valid MongoDB id.").isMongoId(),
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
