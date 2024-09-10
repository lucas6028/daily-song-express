import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";
import RefreshToken from "../auth/RefreshToken";

const router = Router();

router.get("/", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    console.error("Authorization code is missing from request");
    return res.status(400).json({ error: "Authorization code is required" });
  }

  console.log("Received authorization code.");

  try {
    const data = await spotifyAPI.authorizationCodeGrant(code);
    const accessToken = data.body["access_token"];
    const refreshToken = data.body["refresh_token"];
    const expiresIn = data.body["expires_in"];
    console.log("Received access token, refresh token, expires in.");

    spotifyAPI.setAccessToken(accessToken);
    spotifyAPI.setRefreshToken(refreshToken);

    res.cookie("access_token", accessToken, {
      maxAge: expiresIn * 1000,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.cookie("refresh_token", refreshToken, {
      maxAge: expiresIn * 1000 * 30,
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.send("Cookie set: access_token, refresh_token");

    // Set interval for token refresh - consider a more robust strategy
    setInterval(() => {
      RefreshToken();
    }, expiresIn * 1000 * 0.8);
  } catch (err) {
    console.log("redirect uri:" + process.env.API_REDIRECT_URI);
    console.error("Error during authorization code grant", err);
    res.status(400).json({ error: "Failed to retrieve tokens" });
  }
});

router.get("/token", (req, res) => {
  const access_token = req.cookies["access_token"];
  if (!access_token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  if (access_token) {
    res.send(access_token);
  } else {
    res.status(401).json({ error: "Token not available" });
  }
});

export default router;
