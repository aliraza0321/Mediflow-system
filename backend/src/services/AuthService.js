//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

//const { env } = require("../config/env");
//const { ROLES } = require("../config/roles");
//const { User } = require("../domain/entities/User");
//const { AppError } = require("../core/errors/AppError");
//const { ensureAllowedValue, ensureRequiredFields } = require("../core/utils/validators");
//const { UserPresenter } = require("./UserPresenter");

//class AuthService {
//  constructor({ database, userRepository, appointmentRepository }) {
//    this.database = database;
//    this.userRepository = userRepository;
//    this.appointmentRepository = appointmentRepository;
//  }

//  async signup(payload) {
//    ensureRequiredFields(payload, ["name", "email", "password", "role"]);
//    ensureAllowedValue(payload.role, Object.values(ROLES), "role");

//    const existingUser = this.userRepository.findByEmail(payload.email);
//    if (existingUser) {
//      throw new AppError("A user with this email already exists.", 409);
//    }

//    const passwordHash = await bcrypt.hash(payload.password, 10);
//    const user = new User({
//      id: this.database.nextId("user"),
//      name: payload.name,
//      email: payload.email,
//      phone: payload.phone || "",
//      role: payload.role,
//      passwordHash,
//      cnic: payload.cnic || "",
//      dob: payload.dob || "",
//      maritalStatus: payload.status || "Single",
//      isActive: true,
//      profile: this.buildProfile(payload.role),
//    });

//    this.userRepository.create(user);

//    return {
//      message: "Account created successfully.",
//      user: this.attachComputedFields(user),
//    };
//  }

//  async login(payload) {
//    ensureRequiredFields(payload, ["email", "password"]);



//      //const user = this.userRepository.findByEmail(payload.email);
//      const user = await this.userRepository.findByEmail(payload.email);
//    if (!user) {
//      throw new AppError("Invalid email or password.", 401);
//    }

//    if (payload.role && payload.role !== user.role) {
//      throw new AppError("Selected role does not match this account.", 403);
//    }

//      //const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash); 
//      const isPasswordValid = payload.password === user.password;
//      /*let isPasswordValid = false;// temp try to remove hashing error

//      if (user.passwordHash) {
//          // hashed password case
//          isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);
//      } else {
//          // your DB case (plain password column = password)
//          isPasswordValid = payload.password === user.password;
//      }*/
//      console.log("EMAIL:", payload.email);
//      console.log("USER:", user);

//    if (!isPasswordValid) {
//      throw new AppError("Invalid email or password.", 401);
//    }

//    const token = jwt.sign(
//      {
//        sub: user.id,
//        role: user.role,
//        email: user.email,
//      },
//      env.jwtSecret,
//      { expiresIn: "7d" }
//    );

//    return {
//      token,
//      user: this.attachComputedFields(user),
//    };
//  }

//  async resetPassword(payload) {
//    ensureRequiredFields(payload, ["email", "newPassword"]);

//    const user = await this.userRepository.findByEmail(payload.email);//added await here
//      if (!user || payload.password !== user.password) {
//          throw new AppError("Invalid email or password.", 401);
//      }

//    user.passwordHash = await bcrypt.hash(payload.newPassword, 10);
//    this.userRepository.update(user);

//    return {
//      message: "Password updated successfully.",
//    };
//  }

//  buildProfile(role) {
//    if (role === ROLES.DOCTOR) {
//      return {
//        specialization: "General Medicine",
//        experience: "0 years",
//        timing: "09:00 AM - 05:00 PM",
//        department: "General",
//      };
//    }

//    if (role === ROLES.PATIENT) {
//      return {
//        age: null,
//        blood: "Unknown",
//      };
//    }

//    return {
//      department: "Administration",
//      shift: "Morning",
//    };
//  }

//  attachComputedFields(user) {
//    const patientCount = user.role === ROLES.DOCTOR
//      ? new Set(this.appointmentRepository.findByDoctorId(user.id).map((item) => item.patientId)).size
//      : undefined;

//    return UserPresenter.toSafeUser(user, {
//      patients: patientCount,
//    });
//  }
//}

//module.exports = { AuthService };

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

    // ================= SIGNUP =================
    async signup(payload) {
        ensureRequiredFields(payload, ["name", "email", "password", "role"]);
        ensureAllowedValue(payload.role, Object.values(ROLES), "role");

        const existingUser = await this.userRepository.findByEmail(payload.email);

        if (existingUser) {
            throw new AppError("A user with this email already exists.", 409);
        }

        const passwordHash = await bcrypt.hash(payload.password, 10);

        const user = new User({
            // id: this.database.nextId("user"), mariadb autoincrement
            id: undefined,
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

        const createdUser = await this.userRepository.create(user);

        return {
            message: "Account created successfully.",
            user: await this.attachComputedFields(createdUser),
        };
    }

    // ================= LOGIN =================
    async login(payload) {
        ensureRequiredFields(payload, ["email", "password"]);

        const user = await this.userRepository.findByEmail(payload.email);

        if (!user) {
            throw new AppError("Invalid email or password.", 401);
        }

        if (payload.role && payload.role !== user.role) {
            throw new AppError("Selected role does not match this account.", 403);
        }

        const storedPassword = user.passwordHash || user.password || "";
        const isPasswordValid = storedPassword.startsWith("$2")
            ? await bcrypt.compare(payload.password, storedPassword)
            : payload.password === storedPassword;

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
            user: await this.attachComputedFields(user),
        };
    }

    // ================= RESET PASSWORD =================
    async resetPassword(payload) {
        ensureRequiredFields(payload, ["email", "newPassword"]);

        const user = await this.userRepository.findByEmail(payload.email);

        if (!user) {
            throw new AppError("User not found.", 404);
        }

        user.passwordHash = await bcrypt.hash(payload.newPassword, 10);
        await this.userRepository.update(user);

        return {
            message: "Password updated successfully.",
        };
    }

    // ================= PROFILE =================
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

    async attachComputedFields(user) {
        const patientCount =
            user.role === ROLES.DOCTOR
                ? new Set(
                    (await this.appointmentRepository
                        .findByDoctorId(user.id))
                        .map((item) => item.patientId)
                ).size
                : undefined;

        return UserPresenter.toSafeUser(user, {
            patients: patientCount,
        });
    }
}

module.exports = { AuthService };
