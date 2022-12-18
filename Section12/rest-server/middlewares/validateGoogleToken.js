import { request, response } from "express";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

async function validateGoogleToken(req = request, res = response, next) {
  const { id_token } = req.body;

  if (!id_token)
    return res.status(400).json({
      message: "Bad request - no token provided",
    });

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });
    const { name, picture, email } = ticket.getPayload();

    req.authUser = {
      name,
      picture,
      email,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export default validateGoogleToken;
