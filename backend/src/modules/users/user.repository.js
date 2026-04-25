import BaseRepository from "../../shared/BaseRepository.js";
import { query } from "../../config/database.js";
import env from "../../config/env.js";
import memoryStore from "../../shared/memoryStore.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async create(userData) {
    if (env.storageMode === "memory") {
      return this.createMemoryRecord({
        full_name: userData.fullName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phone_number: userData.phoneNumber || null
      });
    }

    const sql = `
      INSERT INTO users (full_name, email, password, role, phone_number)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      userData.fullName,
      userData.email,
      userData.password,
      userData.role,
      userData.phoneNumber || null
    ]);

    return this.findById(result.insertId);
  }

  async findByEmail(email) {
    if (env.storageMode === "memory") {
      return memoryStore.users.find((user) => user.email === email) || null;
    }

    const rows = await query(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email]);
    return rows[0] || null;
  }
}

export default UserRepository;
