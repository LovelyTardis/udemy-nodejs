import { request, response } from "express";

export const validateRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user)
      return res.status(500).json({
        message: "Internal server error",
      });

    const { role } = req.user;

    if (!roles.includes(role))
      return res.status(401).json({
        message: "Forbidden - no privileges",
      });

    next();
  };
};
