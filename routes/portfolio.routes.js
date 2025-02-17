import express from "express";
const router = express.Router();

// Portfolio routes will be added later
router.get("/", (req, res) => {
  res.json({ message: "Portfolio route" });
});

export default router;
