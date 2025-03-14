const express = require("express");
const router = express.Router();
const pool = require("../configs/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;

// Register route
router.post("/register", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  try {
    const patientCheck = await pool.query(
      "SELECT * FROM patients WHERE email = $1",
      [email]
    );
    if (patientCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newPatient = await pool.query(
        "INSERT INTO patients (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [email, first_name, last_name, hashedPassword]
      );

      const token = jwt.sign({ id: newPatient.rows[0].id }, JWT_SECRET);
      res.status(201).json({
        message: "Account created successfully!",
        token,
        user: {
          id: newPatient.rows[0].id,
          email: newPatient.rows[0].email,
          first_name: newPatient.rows[0].first_name,
          last_name: newPatient.rows[0].last_name,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mock Register route
const mockDB = [];

router.post("/mock-register", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  try {
    const patientCheck = mockDB.find((patient) => patient.email === email);
    if (patientCheck) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newPatient = {
        id: mockDB.length + 1,
        email,
        first_name,
        last_name,
        password: hashedPassword,
      };
      mockDB.push(newPatient);

      const token = jwt.sign({ id: newPatient.id }, JWT_SECRET);
      res.status(201).json({
        message: "Account created successfully!",
        token,
        user: {
          id: newPatient.id,
          email: newPatient.email,
          first_name: newPatient.first_name,
          last_name: newPatient.last_name,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {});

// Logout route
router.post("/logout", async (req, res) => {});

module.exports = router;
