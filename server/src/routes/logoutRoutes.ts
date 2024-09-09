import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.clearCookie("profileId");

  spotifyAPI.setAccessToken("");
  res.send("Log out successfully!");
});

export default router;
