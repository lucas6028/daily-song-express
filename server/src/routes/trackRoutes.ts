import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {});

router.post("/myTop", (req, res) => {
  const { limit } = req.body;
  const access_token = req.cookies["access_token"];

  if (!access_token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  spotifyAPI.setAccessToken(access_token);
  spotifyAPI
    .getMyTopTracks({ limit: limit })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log("Error while get my top track: ", err);
    });
});

router.post("/recommend", (req, res) => {
  const { seed_artists, seed_genres, seed_tracks, min_popularity, limit } =
    req.body;
  const access_token = req.cookies["access_token"];

  if (!access_token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  spotifyAPI.setAccessToken(access_token);
  spotifyAPI
    .getRecommendations({
      seed_artists: seed_artists,
      seed_genres: seed_genres,
      seed_tracks: seed_tracks,
      min_popularity: min_popularity,
      limit: limit,
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log("Error while get recommend track", err);
    });
});

export default router;
