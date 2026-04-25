import BaseService from "../../shared/BaseService.js";
import DoctorRepository from "./doctor.repository.js";
import UserRepository from "../users/user.repository.js";
import { hashPassword } from "../../utils/password.js";
import { requireFields } from "../../utils/validation.js";
import ApiError from "../../utils/ApiError.js";
import ROLES from "../../config/roles.js";

class DoctorService extends BaseService {
  constructor() {
    super(new DoctorRepository(), "Doctor");
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return this.repository.findDetailed();
  }

  async create(payload) {
    requireFields(payload, ["fullName", "email", "password", "specialization", "licenseNumber"]);

    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new ApiError(409, "A user with this email already exists");
    }

    // Doctor accounts follow the same pattern as patients:
    // one user record for authentication, one doctor record for domain data.
    const user = await this.userRepository.create({
      fullName: payload.fullName,
      email: payload.email,
      password: await hashPassword(payload.password),
      role: ROLES.DOCTOR,
      phoneNumber: payload.phoneNumber
    });

    return this.repository.create({
      userId: user.id,
      specialization: payload.specialization,
      licenseNumber: payload.licenseNumber,
      availabilityNotes: payload.availabilityNotes
    });
  }
}

export default DoctorService;
