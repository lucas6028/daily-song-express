import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/logout", (req, res) => {
  req.cookies.destroy(); // Clear cookie
  spotifyAPI.setAccessToken("");
  res.redirect("http://localhost:5173"); // Redirect to your frontend
});

export default router;
