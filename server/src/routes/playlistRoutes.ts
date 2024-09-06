import { Router } from "express";
import spotifyAPI from "../config/spotifyConfig";

const router = Router();

router.get("/", (req, res) => {
  res.send("Spotify playlist creation endpoint");
});

router.get("/create", async (req, res) => {
  try {
    const { name = "My playlist", isPublic = false } = req.body;
    const access_token = req.cookies["access_token"];

    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    spotifyAPI.setAccessToken(access_token);
    const data = await spotifyAPI.createPlaylist(name, { public: isPublic });

    console.log("Playlist created:", data);
    res
      .status(201)
      .json({ message: "Playlist created successfully", playlist: data });
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ error: "Failed to create playlist" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { playlistID, track } = req.body;
    const access_token = req.cookies["access_token"];
    const data = await spotifyAPI.addTracksToPlaylist(playlistID, track);

    if (!access_token) {
      return res.status(401).json({ error: "Access token is missing" });
    }
    spotifyAPI.setAccessToken(access_token);
    console.log("Added track to playlist");
    res.status(201);
  } catch (err) {
    console.error("Error while add track to playlist", err);
    res.status(500).json({ error: "Failed to add track to playlist" });
  }
});

export default router;
