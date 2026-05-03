class MedicineRepository {
  constructor(db) {
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query(
      "SELECT id, medicine_name AS name, stock_quantity AS stock, price, expiry_date AS expiryDate FROM pharmacy ORDER BY medicine_name"
    );
    return rows;
  }
}

module.exports = { MedicineRepository };
