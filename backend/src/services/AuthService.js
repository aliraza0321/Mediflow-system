const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { env } = require("../config/env");
const { ROLES } = require("../config/roles");
const { User } = require("../domain/entities/User");
const { AppError } = require("../core/errors/AppError");
const { ensureAllowedValue, ensureRequiredFields } = require("../core/utils/validators");
const { UserPresenter } = require("./UserPresenter");

class AuthService {
  constructor({ database, userRepository, appointmentRepository }) {
    this.database = database;
    this.userRepository = userRepository;
    this.appointmentRepository = appointmentRepository;
  }

  async signup(payload) {
    ensureRequiredFields(payload, ["name", "email", "password", "role"]);
    ensureAllowedValue(payload.role, Object.values(ROLES), "role");

    const existingUser = this.userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new AppError("A user with this email already exists.", 409);
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = new User({
      id: this.database.nextId("user"),
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "",
      role: payload.role,
      passwordHash,
      cnic: payload.cnic || "",
      dob: payload.dob || "",
      maritalStatus: payload.status || "Single",
      isActive: true,
      profile: this.buildProfile(payload.role),
    });

    this.userRepository.create(user);

    return {
      message: "Account created successfully.",
      user: this.attachComputedFields(user),
    };
  }

  async login(payload) {
    ensureRequiredFields(payload, ["email", "password"]);

    const user = this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    if (payload.role && payload.role !== user.role) {
      throw new AppError("Selected role does not match this account.", 403);
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password.", 401);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        email: user.email,
      },
      env.jwtSecret,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: this.attachComputedFields(user),
    };
  }

  async resetPassword(payload) {
    ensureRequiredFields(payload, ["email", "newPassword"]);

    const user = this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    user.passwordHash = await bcrypt.hash(payload.newPassword, 10);
    this.userRepository.update(user);

    return {
      message: "Password updated successfully.",
    };
  }

  buildProfile(role) {
    if (role === ROLES.DOCTOR) {
      return {
        specialization: "General Medicine",
        experience: "0 years",
        timing: "09:00 AM - 05:00 PM",
        department: "General",
      };
    }

    if (role === ROLES.PATIENT) {
      return {
        age: null,
        blood: "Unknown",
      };
    }

    return {
      department: "Administration",
      shift: "Morning",
    };
  }

  attachComputedFields(user) {
    const patientCount = user.role === ROLES.DOCTOR
      ? new Set(this.appointmentRepository.findByDoctorId(user.id).map((item) => item.patientId)).size
      : undefined;

    return UserPresenter.toSafeUser(user, {
      patients: patientCount,
    });
  }
}

module.exports = { AuthService };
