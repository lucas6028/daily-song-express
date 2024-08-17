import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.post("/", (req, res) => {
  spotifyAPI
    .refreshAccessToken()
    .then((data) => {
      console.log("The access token has been refreshed!");

      // Save the access token so that it's used in future calls
      spotifyAPI.setAccessToken(data.body["access_token"]);
      console.log(data.body["access_token"]);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
      res.sendStatus(400);
    });
});

export default router;
