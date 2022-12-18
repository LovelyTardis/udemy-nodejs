import { Router } from "express";
import {
  getUser,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.post("/", createUser);
userRoutes.delete("/", deleteUser);
userRoutes.patch("/", patchUser);

export default userRoutes;
