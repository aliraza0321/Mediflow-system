class SupportRepository {
  constructor(database) {
    this.database = database;
  }

  findAll() {
    return [...this.database.supportTickets];
  }
}

module.exports = { SupportRepository };
