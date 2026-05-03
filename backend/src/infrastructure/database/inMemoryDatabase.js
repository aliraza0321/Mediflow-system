const { createSeedData } = require("./seedData");

class InMemoryDatabase {
  constructor(seed) {
    this.state = seed;
  }

  static async build() {
    const seed = await createSeedData();
    return new InMemoryDatabase(seed);
  }

  nextId(counterName) {
    this.state.counters[counterName] += 1;
    return this.state.counters[counterName] - 1;
  }

  get users() {
    return this.state.users;
  }

  get appointments() {
    return this.state.appointments;
  }

  get prescriptions() {
    return this.state.prescriptions;
  }

  get ratings() {
    return this.state.ratings;
  }

  get medicines() {
    return this.state.medicines;
  }

  get supportTickets() {
    return this.state.supportTickets;
  }
}

module.exports = { InMemoryDatabase };
