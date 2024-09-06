import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

// Get the authenticated user
router.get("/", (req, res) => {
  const access_token = req.cookies["access_token"];
  // console.log("profile: " + access_token);

  if (!access_token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  spotifyAPI.setAccessToken(access_token);
  spotifyAPI
    .getMe()
    .then((data) => {
      res.cookie("profileId", data.body.id);
      res.json(data);
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
      res.status(400).json({ error: "Failed to retrieve user profile" });
    });
});

export default router;
