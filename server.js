const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Routes
const patientsRoutes = require("./routes/patients");
const otpVerificationRoutes = require("./routes/otpVerification");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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
app.use("/patients", patientsRoutes);
app.use("/otpVerification", otpVerificationRoutes);

// Handle 404 Errors
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});