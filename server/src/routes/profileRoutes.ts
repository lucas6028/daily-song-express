import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

// Get the authenticated user
router.post("/", (req, res) => {
  const { access_token } = req.body;
  spotifyAPI.setAccessToken(access_token);
  spotifyAPI
    .getMe()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
      res.status(400).json({ error: "Failed to retrieve user profile" });
    });
});

export default router;
