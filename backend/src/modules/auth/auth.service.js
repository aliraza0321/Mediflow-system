import ApiError from "../../utils/ApiError.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
import { createToken } from "../../utils/token.js";
import { requireFields } from "../../utils/validation.js";
import UserRepository from "../users/user.repository.js";
import PatientRepository from "../patients/patient.repository.js";
import ROLES from "../../config/roles.js";

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.patientRepository = new PatientRepository();
  }

  async login(credentials) {
    requireFields(credentials, ["email", "password"]);

    // Step 1: find the user by email.
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Step 2: compare the plain password with the hashed password from the database.
    const isPasswordValid = await comparePassword(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Step 3: generate a JWT token that the frontend can send on later requests.
    const token = createToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    };
  }

  async registerPatient(payload) {
    requireFields(payload, ["fullName", "email", "password", "gender", "dateOfBirth"]);

    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new ApiError(409, "A user with this email already exists");
    }

    // Passwords should never be stored as plain text.
    const hashedPassword = await hashPassword(payload.password);

    // First create the generic user account.
    const user = await this.userRepository.create({
      fullName: payload.fullName,
      email: payload.email,
      password: hashedPassword,
      role: ROLES.PATIENT,
      phoneNumber: payload.phoneNumber
    });

    // Then create the patient-specific profile linked to that user.
    const patient = await this.patientRepository.create({
      userId: user.id,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      bloodGroup: payload.bloodGroup,
      address: payload.address,
      emergencyContactName: payload.emergencyContactName,
      emergencyContactPhone: payload.emergencyContactPhone
    });

    return {
      user,
      patient
    };
  }
}

export default AuthService;
