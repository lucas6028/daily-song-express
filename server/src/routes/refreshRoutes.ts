import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {
  const token = req.cookies["refresh_token"];

  spotifyAPI.setRefreshToken(token);
  spotifyAPI.refreshAccessToken();

  res.cookie("access_token", spotifyAPI.getAccessToken(), {
    maxAge: 3600000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.send("Refrsh token successfully!");
});

export default router;
