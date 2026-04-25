import BaseService from "../../shared/BaseService.js";
import PatientRepository from "./patient.repository.js";
import UserRepository from "../users/user.repository.js";
import { hashPassword } from "../../utils/password.js";
import { requireFields } from "../../utils/validation.js";
import ApiError from "../../utils/ApiError.js";
import ROLES from "../../config/roles.js";

class PatientService extends BaseService {
  constructor() {
    super(new PatientRepository(), "Patient");
    this.userRepository = new UserRepository();
  }

  async getAll() {
    // This custom version returns joined user + patient info instead of only raw patient rows.
    return this.repository.findDetailed();
  }

  async create(payload) {
    requireFields(payload, ["fullName", "email", "password", "gender", "dateOfBirth"]);

    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new ApiError(409, "A user with this email already exists");
    }

    // We create records in two places because "users" stores login data
    // while "patients" stores hospital-specific patient details.
    const user = await this.userRepository.create({
      fullName: payload.fullName,
      email: payload.email,
      password: await hashPassword(payload.password),
      role: ROLES.PATIENT,
      phoneNumber: payload.phoneNumber
    });

    return this.repository.create({
      userId: user.id,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      bloodGroup: payload.bloodGroup,
      address: payload.address,
      emergencyContactName: payload.emergencyContactName,
      emergencyContactPhone: payload.emergencyContactPhone
    });
  }
}

export default PatientService;
