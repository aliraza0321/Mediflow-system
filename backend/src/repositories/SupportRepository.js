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
}

module.exports = { SupportRepository };
