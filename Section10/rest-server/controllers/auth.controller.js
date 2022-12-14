import { request, response } from "express";

export const loginUser = (req = request, res = response) => {
  res.json({
    message: "/login OK",
  });
};
