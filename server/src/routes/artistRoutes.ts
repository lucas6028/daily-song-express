import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/myTop", async (req, res) => {
  try {
    const { time_range = "medium_term", limit = 10, offset = 5 } = req.body;
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
