import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {
  res.cookie("access_token", "", {
    maxAge: 0, // Set cookie expiration to 0 to delete it
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.cookie("refresh_token", "", {
    maxAge: 0, // Set cookie expiration to 0 to delete it
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  spotifyAPI.setAccessToken("");
  res.send("Log out successfully!");
});

export default router;
