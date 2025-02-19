import express from "express";
import {
  adminLogin,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin routes
router.post("/login", adminLogin); // This will handle /admin/login
router.get("/dashboard/stats", protect, restrictTo("admin"), getDashboardStats);

export default router;
