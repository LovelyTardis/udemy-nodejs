import { request, response } from "express";

import generateJwt from "../helpers/generateJwt.js";
import { passwordHash, passwordVerify } from "../helpers/passwordHash.js";
import { Create, FindOne } from "../database/helpers/index.js";
import { User } from "../models/index.js";

export const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await FindOne(User, { filter: email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    } else {
      const valid = passwordVerify(password, user.password);

      if (!valid)
        return res.status(400).json({
          message: "Wrong email or password",
        });
    }

    if (!user.state)
      return res.status(400).json({
        message: "User not active",
      });

    const token = await generateJwt(user.id);

    res.json({
      message: "/login OK",
      token,
      data: user,
    });
  } catch (error) {
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
    let user = await FindOne(User, { filter: email });

    if (!user) {
      const password = passwordHash("google_no_need_password");

      const dataToSave = {
        name,
        picture,
        email,
        password,
        google: true,
      };

      user = await Create(User, dataToSave);
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
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "ERROR: Google user could not be authenticated",
    });
  }
};
