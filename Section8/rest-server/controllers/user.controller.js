import { response, request } from "express";

export const getUser = (req = request, res = response) => {
  const { q, name = "unknown", apikey } = req.query;
  res.json({
    msg: "get /api/user",
    data: {
      q,
      name,
      apikey,
    },
  });
};

export const createUser = (req = request, res = response) => {
  const data = req.body;
  res.status(201).json({
    msg: "post /api/user",
    data: {
      ...data,
    },
  });
};

export const updateUser = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put /api/user",
    id,
  });
};

export const deleteUser = (req = request, res = response) => {
  res.json({
    msg: "delete /api/user",
  });
};

export const patchUser = (req = request, res = response) => {
  res.json({
    msg: "patch /api/user",
  });
};
