import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.post("/myTop", async (req, res) => {
  try {
    const access_token = req.cookies["access_token"];
    const { time_range = "medium_term", limit = 10, offset = 5 } = req.body;

    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing" });
    }
    spotifyAPI.setAccessToken(access_token);

    const data = await spotifyAPI.getMyTopArtists({
      time_range: time_range,
      limit: limit,
      offset: offset,
    });

    console.log(data);
    res.json(data);
  } catch (err) {
    console.error("Error while get top artist: " + err);
  }
});

export default router;
