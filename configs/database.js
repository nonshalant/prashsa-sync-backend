const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT, 10) || 5431,
});

pool
  .connect()
  .then(() =>
    console.log("Connected to PostgreSQL on port", process.env.PG_PORT)
  )
  .catch((err) => console.error("Database connection error:", err));

module.exports = pool;
