import { request, response } from "express";

import generateJwt from "../helpers/generateJwt.js";
import { findUserByEmail, createUser } from "../helpers/user/index.js";
import { passwordHash, passwordVerify } from "../helpers/passwordHash.js";

export const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

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
  const authUser = req.authUser;

  if (!authUser)
    return res.status(400).json({
      message: "Bad request - no authenticated user",
    });

  const { name, picture, email } = authUser;

  try {
    let user = await findUserByEmail(email);

    if (!user) {
      const password = passwordHash("google_no_need_password");

      const userToSave = {
        name,
        picture,
        email,
        password,
        google: true,
      };

      user = await createUser(userToSave);
    }

    if (!user.state)
      return res.status(401).json({
        message:
          "Not authorized - user not active, contact with an administrator",
      });

    const token = await generateJwt(user.id);

    res.json({
      message: "Signed in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ERROR: Google user could not be authenticated",
    });
  }
};
