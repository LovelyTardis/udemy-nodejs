import { request, response } from "express";

export const validateRoles = (req = request, res = response, next) => {
  if (!req.user)
    return res.status(500).json({
      message: "Internal server error",
    });

  const { role } = req.user;

  if (role !== "ADMIN_ROLE")
    return res.status(401).json({
      message: "Forbidden - no privileges",
    });

  next();
};
