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

router.get("/recommend", (req, res) => {
  const seedArtists = req.query.seed_artists as
    | string
    | readonly string[]
    | undefined;
  const seedGenres = req.query.seed_genres as
    | string
    | readonly string[]
    | undefined;
  const seedTracks = req.query.seed_tracks as
    | string
    | readonly string[]
    | undefined;
  const minPopularity = req.query.min_popularity as number | undefined;

  spotifyAPI
    .getRecommendations({
      seed_artists: seedArtists,
      seed_genres: seedGenres,
      seed_tracks: seedTracks,
      min_popularity: minPopularity,
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
