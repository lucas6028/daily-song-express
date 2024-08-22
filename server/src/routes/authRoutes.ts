import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();
let token = "";

router.post("/", (req, res) => {
  const { code } = req.body;

  if (!code) {
    console.error("Authorization code is missing from request");
    return res.status(400).json({ error: "Code is required" });
  }

  console.log("Received authorization code.");

  spotifyAPI.authorizationCodeGrant(code).then(
    (data) => {
      // console.log("The token expires in " + data.body["expires_in"]);
      // console.log("The refresh token is " + data.body["refresh_token"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("Received access token, refresh token, expires in.");
      token = data.body["access_token"];

      spotifyAPI.setAccessToken(data.body["access_token"]);
      spotifyAPI.setRefreshToken(data.body["refresh_token"]);

      res.json(data.body.expires_in);
    },
    (err) => {
      console.error("Error during authorization code grant", err);
      res.status(400).json({ error: "Failed to retrieve tokens" });
    }
  );
});

router.get("/token", (req, res) => {
  res.send(token);
});

export default router;
