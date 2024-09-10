import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh_token"];

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token is missing" });
    }

    spotifyAPI.setRefreshToken(refreshToken);

    const data = await spotifyAPI.refreshAccessToken();
    const accessToken = data.body["access_token"];
    const expiresIn = data.body["expires_in"];

    console.log("New access token:", accessToken);

    // Set the new access token in cookies
    res.cookie("access_token", accessToken, {
      maxAge: expiresIn * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).send("Token refreshed successfully!");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ error: "Failed to refresh access token" });
  }
});

export default router;
