import { request, response } from "express";
import jwt from "jsonwebtoken";

const validateJwt = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(400).json({
      message: "Bad request",
    });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

export default validateJwt;
