import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/myTop", async (req, res) => {
  try {
    const data = await spotifyAPI.getMyTopArtists({ limit: 20 });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error("Error while get top artist: " + err);
  }
});

export default router;
