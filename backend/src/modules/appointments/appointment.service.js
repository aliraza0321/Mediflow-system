import BaseService from "../../shared/BaseService.js";
import AppointmentRepository from "./appointment.repository.js";
import PatientRepository from "../patients/patient.repository.js";
import DoctorRepository from "../doctors/doctor.repository.js";
import { requireFields } from "../../utils/validation.js";
import ApiError from "../../utils/ApiError.js";

class AppointmentService extends BaseService {
  constructor() {
    super(new AppointmentRepository(), "Appointment");
    this.patientRepository = new PatientRepository();
    this.doctorRepository = new DoctorRepository();
  }

  async getAll() {
    return this.repository.findDetailed();
  }

  async create(payload) {
    requireFields(payload, ["patientId", "doctorId", "appointmentDate", "appointmentTime"]);

    // Make sure both related records exist before creating the appointment.
    const patient = await this.patientRepository.findById(payload.patientId);
    const doctor = await this.doctorRepository.findById(payload.doctorId);

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    // This prevents double-booking a doctor at the same date and time.
    const existingAppointment = await this.repository.findConflictingAppointment(
      payload.doctorId,
      payload.appointmentDate,
      payload.appointmentTime
    );

    if (existingAppointment) {
      throw new ApiError(409, "Doctor already has an appointment at this time");
    }

    return this.repository.create(payload);
  }
}

export default AppointmentService;
