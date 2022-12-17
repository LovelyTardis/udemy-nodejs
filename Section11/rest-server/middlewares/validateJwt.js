import { request, response } from "express";
import jwt from "jsonwebtoken";

import { findUserById } from "../helpers/user/index.js";

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(400).json({
      message: "Bad request - no token",
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await findUserById(uid);

    if (!user)
      return res.status(400).json({
        message: "Bad request - user not in the database",
      });

    if (!user.state)
      return res.status(401).json({
        message: "Forbidden - user not activated",
      });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Forbidden - error while trying to token verify",
    });
  }
};

export default validateJwt;
