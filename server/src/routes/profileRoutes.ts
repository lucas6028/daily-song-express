import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

// Get the authenticated user
router.get("/", (req, res) => {
  spotifyAPI
    .getMe()
    .then((data) => {
      console.log("Some information about the authenticated user", data.body);
      res.json(data);
    })
    .catch((err) => {
      console.log("Something went wrong!", err);
      res.status(400).json({ error: "Failed to retrieve user profile" });
    });
});

export default router;
