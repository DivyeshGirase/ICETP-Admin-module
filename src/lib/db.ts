import mysql from "mysql2";

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",  // Your MySQL host (defaults to localhost)
  user: process.env.DB_USER || "root",      // Your MySQL user (defaults to root)
  password: process.env.DB_PASSWORD || "admin",  // Your MySQL password (leave empty for local testing)
  database: process.env.DB_NAME || "icetp_db",  // Your database name
});

// Use a promise wrapper to allow async/await
const db = pool.promise();

export default db;
