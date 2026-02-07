import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import checkpointRoutes from "./routes/checkpointRoutes.js";
import directionsRoutes from "./routes/directionsRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/checkpoint", checkpointRoutes);
app.use("/directions", directionsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
