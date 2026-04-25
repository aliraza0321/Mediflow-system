import { query } from "../config/database.js";
import env from "../config/env.js";
import memoryStore, { nextId } from "./memoryStore.js";

class BaseRepository {
  constructor(tableName) {
    // This class is meant to be extended by feature-specific repositories.
    if (new.target === BaseRepository) {
      throw new Error("BaseRepository is abstract and cannot be instantiated directly");
    }

    this.tableName = tableName;
  }

  async findAll() {
    if (env.storageMode === "memory") {
      return [...memoryStore[this.tableName]].reverse();
    }

    // Child repositories automatically inherit simple "get all" behavior.
    return query(`SELECT * FROM ${this.tableName} ORDER BY id DESC`);
  }

  async findById(id) {
    if (env.storageMode === "memory") {
      return memoryStore[this.tableName].find((item) => item.id === Number(id)) || null;
    }

    const rows = await query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  async deleteById(id) {
    if (env.storageMode === "memory") {
      const index = memoryStore[this.tableName].findIndex((item) => item.id === Number(id));

      if (index >= 0) {
        memoryStore[this.tableName].splice(index, 1);
      }

      return { affectedRows: index >= 0 ? 1 : 0 };
    }

    return query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }

  createMemoryRecord(payload) {
    const record = {
      id: nextId(this.tableName),
      ...payload,
      created_at: new Date().toISOString()
    };

    memoryStore[this.tableName].push(record);
    return record;
  }
}

export default BaseRepository;
