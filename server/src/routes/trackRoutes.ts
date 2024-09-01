import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {});

router.get("/myTop", (req, res) => {
  spotifyAPI
    .getMyTopTracks()
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
