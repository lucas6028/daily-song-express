import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

// my top artists
router.get("/myTop", async (req, res) => {
  try {
    const access_token = req.cookies["access_token"];
    const {
      time_range = "medium_term",
      limit = 10,
      offset = 5,
    } = req.query as {
      time_range?: "medium_term" | "long_term" | "short_term" | undefined;
      limit?: number | undefined;
      offset?: number | undefined;
    };

    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing" });
    }
    spotifyAPI.setAccessToken(access_token);

    const data = await spotifyAPI.getMyTopArtists({
      time_range: time_range,
      limit: limit,
      offset: offset,
    });

    res.json(data);
  } catch (err) {
    console.error("Error while get top artist: " + err);
  }
});

// artist's top tracks
router.get("/topTracks", async (req, res) => {
  try {
    const access_token = req.cookies["access_token"];
    const { id = "6HvZYsbFfjnjFrWF950C9d", market = "ES" } = req.query as {
      id?: string;
      market?: string;
    };

    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing" });
    }
    spotifyAPI.setAccessToken(access_token);

    const data = await spotifyAPI.getArtistTopTracks(id, market);

    res.json(data);
  } catch (err) {
    console.error("Error while get artist top tracks: " + err);
  }
});

export default router;
