import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import refreshRoutes from "./routes/refreshRoutes";

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use(cors());

app.use("/login", authRoutes);
app.use("/refresh", refreshRoutes);

export default app;
