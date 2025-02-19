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

// CORS Configuration
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/admin", adminRoutes);
app.use("/api/leads", leadRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NexusGen Technologies API",
    status: "Server is running",
    version: "1.0.0",
  });
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Set a timeout for MongoDB connection
    const connectWithRetry = async (retries = 5) => {
      try {
        await connectDB();
        app.listen(PORT, "0.0.0.0", () => {
          logger.info(`🚀 Server running on port ${PORT}`);
        });
      } catch (error) {
        if (retries > 0) {
          logger.info(`Retrying connection... ${retries} attempts left`);
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
          return connectWithRetry(retries - 1);
        }
        throw error;
      }
    };

    await connectWithRetry();
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error("Unhandled Rejection:", error);
  process.exit(1);
});
