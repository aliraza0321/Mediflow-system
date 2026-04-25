import mysql from "mysql2/promise";
import env from "./env.js";

// A connection pool lets many requests share database connections efficiently.
const pool = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// All repositories call this helper instead of talking to MySQL directly.
export const query = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

export default pool;
