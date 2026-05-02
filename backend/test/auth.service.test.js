const test = require("node:test");
const assert = require("node:assert/strict");

const { InMemoryDatabase } = require("../src/infrastructure/database/inMemoryDatabase");
const { UserRepository } = require("../src/repositories/UserRepository");
const { AppointmentRepository } = require("../src/repositories/AppointmentRepository");
const { AuthService } = require("../src/services/AuthService");

test("auth service logs in a seeded doctor account", async () => {
  const database = await InMemoryDatabase.build();
  const service = new AuthService({
    database,
    userRepository: new UserRepository(database),
    appointmentRepository: new AppointmentRepository(database),
  });

  const result = await service.login({
    email: "doctor@mediflow.com",
    password: "Password123!",
    role: "doctor",
  });

  assert.equal(typeof result.token, "string");
  assert.equal(result.user.role, "doctor");
});
