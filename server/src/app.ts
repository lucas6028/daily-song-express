import cors from "cors";
import lusca from "lusca";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/loginRoutes";
import refreshRoutes from "./routes/refreshRoutes";
import profileRoutes from "./routes/profileRoutes";
import trackRoutes from "./routes/trackRoutes";
import artistRoutes from "./routes/artistRoutes";
import playlistRoutes from "./routes/playlistRoutes";
import logoutRoutes from "./routes/logoutRoutes";
import rootRoutes from "./routes/rootRoutes";
import checkRoutes from "./routes/checkRoutes";

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(
  cors({
    origin: process.env.API_CLIENT_URI, // Specify the exact origin
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.API_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(
  lusca.csrf({
    cookie: "_csrf",
  })
);

app.use("/", rootRoutes);
app.use("/login", authRoutes);
app.use("/logout", logoutRoutes);
app.use("/refresh", refreshRoutes);
app.use("/profile", profileRoutes);
app.use("/track", trackRoutes);
app.use("/artist", artistRoutes);
app.use("/playlist", playlistRoutes);
app.use("/check-token", checkRoutes);

export default app;
