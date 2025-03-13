const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const otpVerificationRoutes = require("./routes/OtpVerification");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://70f3-2600-4040-986a-3700-108b-e427-45df-e26e.ngrok-free.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// Use Routes
app.use("/auth", authRoutes);
app.use("/otpVerification", otpVerificationRoutes);

// Handle 404 Errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
