import express from "express";
import SpotifyWebAPI from "spotify-web-api-node";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;
const redirectURI = process.env.API_REDIRECT_URI;
const client_id = process.env.API_CLIENT_ID;
const client_secret = process.env.API_CLIENT_SECRET;

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

app.post("/login", (req, res) => {
  const { code } = req.body;

  if (!code) {
    console.error("Authorization code is missing from request");
    return res.status(400).json({ error: "Code is required" });
  }

  console.log("Received authorization code:", code);

  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: redirectURI,
    clientId: client_id,
    clientSecret: client_secret,
  });

  spotifyAPI.authorizationCodeGrant(code).then(
    (data) => {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);

      // Set the access token on the API object to use it in later calls
      spotifyAPI.setAccessToken(data.body["access_token"]);
      spotifyAPI.setRefreshToken(data.body["refresh_token"]);

      res.send(data.body["access_token"]);
    },
    (err) => {
      console.error("Error during authorization code grant", err);
      res.status(400).json({ error: "Failed to retrieve tokens" });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
