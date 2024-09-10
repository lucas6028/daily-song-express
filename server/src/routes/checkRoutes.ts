import spotifyAPI from "../config/spotifyConfig";
import { Router } from "express";

const router = Router();

// /check-token
router.get("/", async (req, res) => {
  const accessToken = req.cookies["access_token"];
  const refreshToken = req.cookies["refresh_token"];

  if (accessToken) {
    // Access token exists, assume it's valid
    return res
      .status(200)
      .json({ authenticated: true, message: "Access token is present" });
  }

  if (refreshToken) {
    // No access token, but refresh token exists, so refresh the access token
    try {
      spotifyAPI.setRefreshToken(refreshToken);
      const data = await spotifyAPI.refreshAccessToken();
      const newAccessToken = data.body["access_token"];
      const expiresIn = data.body["expires_in"];

      res.cookie("access_token", newAccessToken, {
        maxAge: expiresIn * 1000, // Expiration time from Spotify's response
        httpOnly: true, // Protect the cookie from JavaScript
        secure: process.env.NODE_ENV === "production", // Secure cookie in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });

      return res
        .status(200)
        .json({ authenticated: true, message: "Access token refreshed" });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(500).json({
        authenticated: false,
        message: "Failed to refresh access token",
      });
    }
  }

  // If neither token is available, request the user to log in
  return res
    .status(401)
    .json({ authenticated: false, message: "No tokens, please log in" });
});

export default router;
