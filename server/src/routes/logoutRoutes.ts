import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {
  const client_uri = process.env.API_CLIENT_URI || undefined;

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.clearCookie("profileId");

  spotifyAPI.setAccessToken("");
  // res.redirect(client_uri ? client_uri : ""); // Redirect to your frontend
  res.send("Log out successfully!");
});

export default router;
