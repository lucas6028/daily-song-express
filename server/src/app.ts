import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import refreshRoutes from "./routes/refreshRoutes";
import profileRoutes from "./routes/profileRoutes";
import trackRoutes from "./routes/trackRoutes";
import artistRoutes from "./routes/artistRoutes";
import playlistRoutes from "./routes/playlistRoutes";

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

app.use("/login", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/profile", profileRoutes);
app.use("/track", trackRoutes);
app.use("/artist", artistRoutes);
app.use("/playlist", playlistRoutes);

export default app;
