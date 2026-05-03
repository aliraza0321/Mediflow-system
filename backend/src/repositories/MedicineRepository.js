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

  async create(medicine) {
    const [result] = await this.db.query(
      "INSERT INTO pharmacy (medicine_name, stock_quantity, price, expiry_date) VALUES (?, ?, ?, ?)",
      [
        medicine.name,
        Number(medicine.stock),
        Number(medicine.price || 0),
        medicine.expiryDate || null,
      ]
    );

    return {
      id: result.insertId,
      name: medicine.name,
      stock: Number(medicine.stock),
      price: Number(medicine.price || 0),
      expiryDate: medicine.expiryDate || null,
    };
  }

  async updateStock(id, stock) {
    const [result] = await this.db.query(
      "UPDATE pharmacy SET stock_quantity = ? WHERE id = ?",
      [Number(stock), Number(id)]
    );
    return result.affectedRows > 0;
  }
}

module.exports = { MedicineRepository };
