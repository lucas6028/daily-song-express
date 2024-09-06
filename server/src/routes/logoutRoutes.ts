import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/logout", (req, res) => {
  const client_uri = process.env.API_CLIENT_URI || undefined;

  req.cookies.destroy(); // Clear cookie
  spotifyAPI.setAccessToken("");
  res.redirect(client_uri ? client_uri : ""); // Redirect to your frontend
});

export default router;
