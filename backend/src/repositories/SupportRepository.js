class SupportRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query(
      `SELECT
        s.id,
        p.user_id AS userId,
        s.issue AS message,
        s.status,
        s.created_at AS createdAt
       FROM support s
       JOIN patients p ON p.id = s.patient_id
       ORDER BY s.created_at DESC`
    );
    return rows;
  }

  async updateStatus(id, status) {
    const [result] = await this.db.query(
      "UPDATE support SET status = ? WHERE id = ?",
      [status, Number(id)]
    );
    return result.affectedRows > 0;
  }

  async create({ patientId, staffId, issue }) {
    const [result] = await this.db.query(
      "INSERT INTO support (patient_id, staff_id, issue, status) VALUES (?, ?, ?, ?)",
      [Number(patientId), Number(staffId), issue, "Pending"]
    );

    return {
      id: result.insertId,
      patientId: Number(patientId),
      staffId: Number(staffId),
      message: issue,
      status: "Pending",
    };
  }
}

module.exports = { SupportRepository };
