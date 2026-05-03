const test = require("node:test");
const assert = require("node:assert/strict");
const bcrypt = require("bcryptjs");

const { AuthService } = require("../src/services/AuthService");

test("auth service logs in a seeded doctor account", async () => {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const service = new AuthService({
    userRepository: {
      async findByEmail(email) {
        if (email !== "doctor@mediflow.com") return null;
        return {
          id: 1,
          name: "Dr. Ayesha Khan",
          email,
          phone: "03001234567",
          role: "doctor",
          password: passwordHash,
          passwordHash,
          isActive: true,
          profile: { specialization: "Cardiology" },
        };
      },
    },
    appointmentRepository: {
      async findByDoctorId() {
        return [{ patientId: 3 }, { patientId: 4 }];
      },
    },
  });

  const result = await service.login({
    email: "doctor@mediflow.com",
    password: "Password123!",
    role: "doctor",
  });

  assert.equal(typeof result.token, "string");
  assert.equal(result.user.role, "doctor");
});
