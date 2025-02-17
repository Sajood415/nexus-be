import express from "express";
import {
  adminLogin,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/dashboard/stats", protect, restrictTo("admin"), getDashboardStats);

export default router;
