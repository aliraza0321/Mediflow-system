class UserRepository {
  constructor(database) {
    this.database = database;
  }

  findByEmail(email) {
    return this.database.users.find((user) => user.email === email.toLowerCase()) || null;
  }

  findById(id) {
    return this.database.users.find((user) => user.id === Number(id)) || null;
  }

  create(user) {
    this.database.users.push(user);
    return user;
  }

  findAll() {
    return [...this.database.users];
  }

  findByRole(role) {
    return this.database.users.filter((user) => user.role === role);
  }

  update(user) {
    const index = this.database.users.findIndex((item) => item.id === user.id);
    this.database.users[index] = user;
    return user;
  }
}

module.exports = { UserRepository };
