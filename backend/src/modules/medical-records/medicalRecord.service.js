import BaseService from "../../shared/BaseService.js";
import MedicalRecordRepository from "./medicalRecord.repository.js";
import PatientRepository from "../patients/patient.repository.js";
import DoctorRepository from "../doctors/doctor.repository.js";
import { requireFields } from "../../utils/validation.js";
import ApiError from "../../utils/ApiError.js";

class MedicalRecordService extends BaseService {
  constructor() {
    super(new MedicalRecordRepository(), "Medical record");
    this.patientRepository = new PatientRepository();
    this.doctorRepository = new DoctorRepository();
  }

  async getAll() {
    return this.repository.findDetailed();
  }

  async create(payload) {
    requireFields(payload, ["patientId", "doctorId", "diagnosis", "visitDate"]);

    // A medical record is a relationship between a patient and a doctor.
    const patient = await this.patientRepository.findById(payload.patientId);
    const doctor = await this.doctorRepository.findById(payload.doctorId);

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    return this.repository.create(payload);
  }
}

export default MedicalRecordService;
