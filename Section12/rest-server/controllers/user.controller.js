import { response, request } from "express";
import { User } from "../models/index.js";
import { passwordHash } from "../helpers/passwordHash.js";

import { FindAll, Create, Update, Delete } from "../database/helpers/index.js";

export const getAllUsers = async (req = request, res = response) => {
  const { limit, from } = req.query;

  try {
    const [totalUsers, users] = await FindAll(User, { limit, from });

    res.json({
      message: "Users found",
      totalUsers,
      entries: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while getting all users",
    });
  }
};

export const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const dataToSave = {
    name,
    email,
    password,
    role,
  };
  dataToSave.password = passwordHash(password);

  try {
    const user = await Create(User, dataToSave);

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while creating a user",
    });
  }
};

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...updatedData } = req.body;

  if (password) {
    updatedData.password = passwordHash(password);
  }

  try {
    const user = await Update(User, { id, updatedData });

    res.json({
      message: `User '${id}' updated`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while updating a user",
    });
  }
};

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Delete(User, id);

    res.json({
      message: `User ${id} deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      error: `ERROR: ${error}`,
      message: "Internal server error while deleting a user",
    });
  }
};
