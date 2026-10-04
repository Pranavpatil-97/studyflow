import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import focusRoutes from "./routes/focusRoutes.js";
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/api/focus", focusRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/tasks", taskRoutes);

app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

// Central error handler (catches errors from asyncHandler)
app.use((err, _req, res, _next) => {
  if (err.name === "ValidationError" || err.name === "CastError")
    return res.status(400).json({ message: err.message });
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
);