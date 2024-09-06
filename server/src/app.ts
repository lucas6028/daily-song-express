import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/loginRoutes";
import refreshRoutes from "./routes/refreshRoutes";
import profileRoutes from "./routes/profileRoutes";
import trackRoutes from "./routes/trackRoutes";
import artistRoutes from "./routes/artistRoutes";
import playlistRoutes from "./routes/playlistRoutes";
import logoutRoutes from "./routes/logoutRoutes";

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(
  cors({
    origin: process.env.API_CLIENT_URI, // Specify the exact origin
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(cookieParser());

app.use("/login", authRoutes);
app.use("logout", logoutRoutes);
app.use("/refresh", refreshRoutes);
app.use("/profile", profileRoutes);
app.use("/track", trackRoutes);
app.use("/artist", artistRoutes);
app.use("/playlist", playlistRoutes);

export default app;
