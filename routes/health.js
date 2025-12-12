// routes/health.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public health info (no auth)
router.get("/", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// Example protected health (auth required)
router.get("/secure", protect, (req, res) => {
  res.json({
    success: true,
    status: "ok",
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
