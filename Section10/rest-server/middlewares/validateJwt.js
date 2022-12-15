import { request, response } from "express";
import jwt from "jsonwebtoken";

import { userExistsById } from "../helpers/userExists.js";

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(400).json({
      message: "Bad request",
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await userExistsById(uid);

    if (!user)
      return res.status(400).json({
        message: "User not in the database",
      });

    if (!user.state)
      return res.status(401).json({
        message: "Not authorized",
      });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

export default validateJwt;
