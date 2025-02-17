import express from "express";
import {
  submitContact,
  getContacts,
} from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, getContacts);

export default router;
