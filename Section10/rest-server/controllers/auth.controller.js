import { request, response } from "express";
import bcryptjs from "bcryptjs";
import userExists from "../helpers/userExists.js";

export const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await userExists(email);

    // User exists
    if (!user) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    } else {
      // Password validator
      const valid = bcryptjs.compareSync(password, user.password);
      if (!valid)
        return res.status(400).json({
          message: "Wrong email or password",
        });
    }

    // User active
    if (!user.state)
      return res.status(400).json({
        message: "User not active",
      });

    res.json({
      message: "/login OK",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error while trying to log in",
    });
  }
};
