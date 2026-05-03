class PrescriptionRepository {
  constructor(db) {
    this.db = db;
  }

  toPrescription(row) {
    return {
      id: row.id,
      appointmentId: row.appointment_id,
      patientId: row.patient_user_id,
      doctorId: row.doctor_user_id,
      medicine: row.medicine_name,
      dosage: row.dosage,
      instructions: row.instructions,
      createdAt: row.created_at,
    };
  }

  baseQuery(tail = "") {
    return `
      SELECT
        pr.*,
        pu.id AS patient_user_id,
        du.id AS doctor_user_id
      FROM prescriptions pr
      JOIN patients p ON p.id = pr.patient_id
      JOIN users pu ON pu.id = p.user_id
      JOIN doctors d ON d.id = pr.doctor_id
      JOIN users du ON du.id = d.user_id
      ${tail}
    `;
  }

  async findAll() {
    const [rows] = await this.db.query(this.baseQuery("ORDER BY pr.created_at DESC"));
    return rows.map((row) => this.toPrescription(row));
  }

  async findByDoctorId(doctorId) {
    const [rows] = await this.db.query(this.baseQuery("WHERE du.id = ? ORDER BY pr.created_at DESC"), [Number(doctorId)]);
    return rows.map((row) => this.toPrescription(row));
  }

  async findByPatientId(patientId) {
    const [rows] = await this.db.query(this.baseQuery("WHERE pu.id = ? ORDER BY pr.created_at DESC"), [Number(patientId)]);
    return rows.map((row) => this.toPrescription(row));
  }

  async create(prescription) {
    const [[patient]] = await this.db.query("SELECT id FROM patients WHERE user_id = ?", [prescription.patientId]);
    const [[doctor]] = await this.db.query("SELECT id FROM doctors WHERE user_id = ?", [prescription.doctorId]);

    if (!patient || !doctor) {
      throw new Error("A matching patient and doctor profile are required before creating a prescription.");
    }

    const [[appointment]] = await this.db.query(
      "SELECT id FROM appointments WHERE patient_id = ? AND doctor_id = ? ORDER BY appointment_date DESC, appointment_time DESC LIMIT 1",
      [patient.id, doctor.id]
    );

    if (!appointment) {
      throw new Error("A matching appointment is required before creating a prescription.");
    }

    const [result] = await this.db.query(
      "INSERT INTO prescriptions (appointment_id, patient_id, doctor_id, medicine_name, dosage, instructions) VALUES (?, ?, ?, ?, ?, ?)",
      [
        appointment.id,
        patient.id,
        doctor.id,
        prescription.medicine,
        prescription.dosage,
        prescription.instructions || null,
      ]
    );

    return { ...prescription, id: result.insertId, appointmentId: appointment.id };
  }
}

module.exports = { PrescriptionRepository };
