import { response, request } from "express";

export const getCategories = (req = request, res = response) => {
  res.json({
    message: "get all categories",
  });
};

export const getCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "get all categories",
  });
};

export const createCategory = (req = request, res = response) => {
  const { newUser } = req.body;

  res.json({
    message: "get all categories",
  });
};

export const updateCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "get all categories",
  });
};

export const deleteCategory = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    message: "get all categories",
  });
};
