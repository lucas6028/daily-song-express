import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {});

router.get("/myTop", (req, res) => {
  spotifyAPI
    .getMyTopTracks()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log("Error while get my top track: ", err);
    });
});

export default router;
