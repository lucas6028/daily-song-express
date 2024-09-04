import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";
import RefreshToken from "../auth/RefreshToken";

const router = Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

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

    res.json({ accessToken, refreshToken, expiresIn });

    setInterval(() => {
      RefreshToken();
    }, 2000);
  } catch (err) {
    console.log("redirect uri:" + process.env.API_REDIRECT_URI);
    console.error("Error during authorization code grant", err);
    res.status(400).json({ error: "Failed to retrieve tokens" });
  }
});

router.get("/token", (req, res) => {
  const token = spotifyAPI.getAccessToken();
  if (token) {
    res.send(token);
  } else {
    res.status(401).json({ error: "Token not available" });
  }
});

export default router;
