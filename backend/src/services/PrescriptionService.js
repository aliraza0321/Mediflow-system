const { Prescription } = require("../domain/entities/Prescription");
const { AppError } = require("../core/errors/AppError");
const { ensureRequiredFields } = require("../core/utils/validators");

class PrescriptionService {
  constructor({ database, userRepository, appointmentRepository, prescriptionRepository }) {
    this.database = database;
    this.userRepository = userRepository;
    this.appointmentRepository = appointmentRepository;
    this.prescriptionRepository = prescriptionRepository;
  }

  async listForUser(auth) {
    const prescriptions = auth.role === "doctor"
      ? await this.prescriptionRepository.findByDoctorId(auth.sub)
      : await this.prescriptionRepository.findByPatientId(auth.sub);

    return Promise.all(prescriptions.map(async (prescription) => {
      const patient = await this.userRepository.findById(prescription.patientId);
      const doctor = await this.userRepository.findById(prescription.doctorId);

      return {
        id: prescription.id,
        patientId: prescription.patientId,
        patientName: patient ? patient.name : "Unknown Patient",
        doctorId: prescription.doctorId,
        doctorName: doctor ? doctor.name : "Unknown Doctor",
        medicine: prescription.medicine,
        dosage: prescription.dosage,
        createdAt: prescription.createdAt,
      };
    }));
  }

  async create(payload, doctorId) {
    ensureRequiredFields(payload, ["patientId", "medicine", "dosage"]);

    const patient = await this.userRepository.findById(payload.patientId);
    if (!patient || patient.role !== "patient") {
      throw new AppError("Patient not found.", 404);
    }

    const isAssignedPatient = (await this.appointmentRepository
      .findByDoctorId(doctorId))
      .some((appointment) => appointment.patientId === Number(payload.patientId));

    if (!isAssignedPatient) {
      throw new AppError("You can only create prescriptions for your own patients.", 403);
    }

    const prescription = new Prescription({
      patientId: Number(payload.patientId),
      doctorId,
      medicine: payload.medicine,
      dosage: payload.dosage,
    });

    const createdPrescription = await this.prescriptionRepository.create(prescription);

    return {
      message: "Prescription created successfully.",
      prescription: createdPrescription,
    };
  }
}

module.exports = { PrescriptionService };
