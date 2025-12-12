// server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const healthRoutes = require("./routes/health");


const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// --- Connect to MongoDB ---
connectDB();

// --- Security & parsing middleware ---
app.use(helmet());

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5000";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Rate limiting for auth-related routes ---
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 auth requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use("/api/auth", authLimiter);

// --- API routes ---
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);


// --- Serve frontend from /public ---
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// --- Error handlers ---
app.use(notFound);
app.use(errorHandler);

// --- Start server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
