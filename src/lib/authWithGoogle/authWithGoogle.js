import { OAuth2Client } from "google-auth-library";
import { AppEroor } from "../../pkg/error/customError.js";
import { env } from "../env/env.js";

const client = new OAuth2Client();

export async function verifyGoogleToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: env.authWithGoogle.GOOGLE_WEB_AUTH_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    throw new AppEroor("Invaled Google Token", 403);
  }
}
