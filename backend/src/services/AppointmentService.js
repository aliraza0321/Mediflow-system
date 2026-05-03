const { Appointment } = require("../domain/entities/Appointment");
const { AppError } = require("../core/errors/AppError");
const { ensureRequiredFields } = require("../core/utils/validators");

class AppointmentService {
    constructor({ database, userRepository, appointmentRepository }) {
        this.database = database;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    /*
    create(payload, patientId) {
      const doctorId = this.resolveDoctorId(payload);
      ensureRequiredFields({ ...payload, doctorId }, ["doctorId", "date", "reason"]);
  
      const doctor = this.userRepository.findById(doctorId);
      if (!doctor || doctor.role !== "doctor") {
        throw new AppError("Doctor not found.", 404);
      }
  
      const appointment = new Appointment({
        id: this.database.nextId("appointment"),
        patientId,
        doctorId: Number(doctorId),
        date: payload.date,
        reason: payload.reason,
        status: "scheduled",
        rated: false,
      });
  
      this.appointmentRepository.create(appointment);
  
      return {
        message: "Appointment booked successfully.",
        appointment,
      };
    } */
    async create(payload, patientId) {
        const doctorId = await this.resolveDoctorId(payload);

        ensureRequiredFields({ ...payload, doctorId }, ["doctorId", "date", "reason"]);

        const doctor = await this.userRepository.findById(doctorId);

        if (!doctor || doctor.role !== "doctor") {
            throw new AppError("Doctor not found.", 404);
        }

        const appointment = new Appointment({
            patientId,
            doctorId: Number(doctorId),
            date: payload.date,
            reason: payload.reason,
            status: "scheduled",
            rated: false,
        });

        const createdAppointment = await this.appointmentRepository.create(appointment);

        return {
            message: "Appointment booked successfully.",
            appointment: createdAppointment,
        };
    }

    /*resolveDoctorId(payload) {
      if (payload.doctorId) {
        return Number(payload.doctorId);
      }
  
      if (payload.doctor) {
        const doctor = this.userRepository
          .findByRole("doctor")
          .find((item) => item.name.toLowerCase() === String(payload.doctor).trim().toLowerCase());
  
        return doctor ? doctor.id : null;
      }
  
      return null;
    }*/

    async resolveDoctorId(payload) {
        if (payload.doctorId) {
            return Number(payload.doctorId);
        }

        if (payload.doctor) {
            const doctors = await this.userRepository.findByRole("doctor");

            const doctor = doctors.find(
                (item) =>
                    (item.name || "").toLowerCase() ===
                    String(payload.doctor).trim().toLowerCase()
            );

            if (!doctor) {
                throw new AppError("Doctor not found.", 404);
            }

            return doctor.id;
        }

        throw new AppError("Doctor not found.", 404);
    }

}

module.exports = { AppointmentService };
