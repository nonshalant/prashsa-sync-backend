const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use("/patients", patientsRoutes);
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