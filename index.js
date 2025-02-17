import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import leadRoutes from "./routes/lead.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/admin", adminRoutes);
app.use("/api/leads", leadRoutes);

// Health check route
app.get("/health", (req, res) => {
  logger.info("Health check performed");
  res.status(200).json({
    status: "success",
    message: "Server is running",
    timestamp: new Date(),
  });
});

// Error handling middleware
app.use((err, req, res) => {
  logger.error("Error occurred:", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Failed to connect to database:", error);
    process.exit(1);
  });

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});
