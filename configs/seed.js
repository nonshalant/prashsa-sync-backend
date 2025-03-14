// const pool = require("./database");

// const seedDB = async () => {
//   const query = `
//     INSERT INTO patients (first_name, last_name, email, password) VALUES
//     ('Alice', 'Johnson', 'alice@example.com', 'hashed_password_1'),
//     ('Bob', 'Smith', 'bob@example.com', 'hashed_password_2'),
//     ('Charlie', 'Brown', 'charlie@example.com', 'hashed_password_3')
//   `;

//   try {
//     await pool.query(query);
//     console.log("✅ Patients table seeded successfully!");
//   } catch (error) {
//     console.error("❌ Error seeding database:", error);
//   } finally {
//     pool.end();
//   }
// };

// seedDB();