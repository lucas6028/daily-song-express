import express from "express";
import SpotifyWebAPI from "spotify-web-api-node";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
const redirectURI =
  process.env.REDIRECT_URI || "http://localhost:5173/callback";
const client_id = process.env.CLIENT_ID || "efecfa4580fd46c4aa1a04799c986e1d";
const client_secret =
  process.env.CLIENT_SECRET || "4324744363454d89911c11b05d5dff4d";

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

app.post("/login", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: redirectURI,
    clientId: client_id,
    clientSecret: client_secret,
  });

  spotifyAPI.authorizationCodeGrant(code).then(
    (data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
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
