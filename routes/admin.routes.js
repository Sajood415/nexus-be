import express from "express";
import {
  adminLogin,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", adminLogin);

// Protected admin routes
router.use(protect);
router.use(restrictTo("admin"));
router.get("/dashboard/stats", getDashboardStats);

export default router;
