import express from "express";
import { createLead, getLeads } from "../controllers/lead.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", protect, restrictTo("admin"), getLeads);

export default router;
