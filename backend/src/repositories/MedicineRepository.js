class MedicineRepository {
  constructor(database) {
    this.database = database;
  }

  findAll() {
    return [...this.database.medicines];
  }
}

module.exports = { MedicineRepository };
