import SpotifyWebAPI from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

const spotifyAPI = new SpotifyWebAPI({
  redirectUri: process.env.API_REDIRECT_URI,
  clientId: process.env.API_CLIENT_ID,
  clientSecret: process.env.API_CLIENT_SECRET,
});

export default spotifyAPI;
