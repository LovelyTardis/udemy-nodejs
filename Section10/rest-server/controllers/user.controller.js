import { response, request } from "express";
import User from "../models/user.js";
import { passwordHash } from "../helpers/passwordHash.js";

export const getUser = (req = request, res = response) => {
  const { q, name = "unknown", apikey } = req.query;
  res.json({
    message: "get /api/user",
    data: {
      q,
      name,
      apikey,
    },
  });
};

export const getAllUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [totalUsers, users] = await Promise.all([
    User.countDocuments(),
    User.find(query).skip(from).limit(limit),
  ]);

  res.json({
    message: "Users found",
    totalUsers,
    entries: users.length,
    users,
  });
};

export const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });

  user.password = passwordHash(password);

  await user.save();

  res.status(201).json({
    message: "User created",
    user,
  });
};

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;

  // TODO: validate id in the database

  if (password) {
    rest.password = passwordHash(password);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    message: `User '${id}' updated`,
    user,
  });
};

export const deleteUser = async (req = request, res = response) => {
  const { user: authUser } = req;

  const { id } = req.params;
  const query = { state: false };

  await User.findByIdAndUpdate(id, query);

  res.json({
    message: `User with id '${id}' deleted`,
    authUser,
  });
};

export const patchUser = (req = request, res = response) => {
  res.json({
    message: "patch /api/user",
  });
};
