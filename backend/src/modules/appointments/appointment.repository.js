import BaseRepository from "../../shared/BaseRepository.js";
import { query } from "../../config/database.js";
import env from "../../config/env.js";
import memoryStore from "../../shared/memoryStore.js";

class AppointmentRepository extends BaseRepository {
  constructor() {
    super("appointments");
  }

  async create(appointmentData) {
    if (env.storageMode === "memory") {
      return this.createMemoryRecord({
        patient_id: Number(appointmentData.patientId),
        doctor_id: Number(appointmentData.doctorId),
        appointment_date: appointmentData.appointmentDate,
        appointment_time: appointmentData.appointmentTime,
        status: appointmentData.status || "scheduled",
        reason: appointmentData.reason || null
      });
    }

    const sql = `
      INSERT INTO appointments (
        patient_id, doctor_id, appointment_date, appointment_time, status, reason
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      appointmentData.patientId,
      appointmentData.doctorId,
      appointmentData.appointmentDate,
      appointmentData.appointmentTime,
      appointmentData.status || "scheduled",
      appointmentData.reason || null
    ]);

    return this.findById(result.insertId);
  }

  async findDetailed() {
    if (env.storageMode === "memory") {
      return [...memoryStore.appointments]
        .map((appointment) => {
          const patient = memoryStore.patients.find((item) => item.id === appointment.patient_id);
          const doctor = memoryStore.doctors.find((item) => item.id === appointment.doctor_id);
          const patientUser = memoryStore.users.find((item) => item.id === patient?.user_id);
          const doctorUser = memoryStore.users.find((item) => item.id === doctor?.user_id);

          return {
            ...appointment,
            patient_name: patientUser?.full_name || null,
            doctor_name: doctorUser?.full_name || null,
            specialization: doctor?.specialization || null
          };
        })
        .sort((a, b) => `${b.appointment_date} ${b.appointment_time}`.localeCompare(`${a.appointment_date} ${a.appointment_time}`));
    }

    const sql = `
      SELECT
        a.*,
        up.full_name AS patient_name,
        ud.full_name AS doctor_name,
        d.specialization
      FROM appointments a
      INNER JOIN patients p ON p.id = a.patient_id
      INNER JOIN doctors d ON d.id = a.doctor_id
      INNER JOIN users up ON up.id = p.user_id
      INNER JOIN users ud ON ud.id = d.user_id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `;

    return query(sql);
  }

  async findConflictingAppointment(doctorId, appointmentDate, appointmentTime) {
    if (env.storageMode === "memory") {
      return (
        memoryStore.appointments.find(
          (appointment) =>
            appointment.doctor_id === Number(doctorId) &&
            appointment.appointment_date === appointmentDate &&
            appointment.appointment_time === appointmentTime &&
            ["scheduled", "confirmed"].includes(appointment.status)
        ) || null
      );
    }

    const sql = `
      SELECT * FROM appointments
      WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ?
      AND status IN ('scheduled', 'confirmed')
      LIMIT 1
    `;

    const rows = await query(sql, [doctorId, appointmentDate, appointmentTime]);
    return rows[0] || null;
  }
}

export default AppointmentRepository;
