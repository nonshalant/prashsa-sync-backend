const pool = require("./database");

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    )`;

  try {
    await pool.query(query);
    console.log("Patients table created");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable().finally(() => pool.end());
