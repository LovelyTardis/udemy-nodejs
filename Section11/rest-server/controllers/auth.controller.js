import { request, response } from "express";
import generateJwt from "../helpers/generateJwt.js";
import { userExistsByEmail } from "../helpers/userExists.js";
import { passwordVerify } from "../helpers/passwordHash.js";

export const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await userExistsByEmail(email);

    // User exists
    if (!user) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    } else {
      // Password validator
      const valid = passwordVerify(password, user.password);
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

    // Generate JWT
    const token = await generateJwt(user.id);

    res.json({
      message: "/login OK",
      token,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error while trying to log in",
    });
  }
};

export const googleSignIn = async (req = request, res = response) => {
  const user = req.authUser;

  if (!user)
    return res.status(400).json({
      message: "Bad request - no authenticated user",
    });

  res.json({
    message: "Signed in successfully",
    user,
  });
};
