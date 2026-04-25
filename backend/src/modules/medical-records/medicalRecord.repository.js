import BaseRepository from "../../shared/BaseRepository.js";
import { query } from "../../config/database.js";
import env from "../../config/env.js";
import memoryStore from "../../shared/memoryStore.js";

class MedicalRecordRepository extends BaseRepository {
  constructor() {
    super("medical_records");
  }

  async create(recordData) {
    if (env.storageMode === "memory") {
      return this.createMemoryRecord({
        patient_id: Number(recordData.patientId),
        doctor_id: Number(recordData.doctorId),
        diagnosis: recordData.diagnosis,
        treatment: recordData.treatment || null,
        notes: recordData.notes || null,
        visit_date: recordData.visitDate
      });
    }

    const sql = `
      INSERT INTO medical_records (
        patient_id, doctor_id, diagnosis, treatment, notes, visit_date
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      recordData.patientId,
      recordData.doctorId,
      recordData.diagnosis,
      recordData.treatment || null,
      recordData.notes || null,
      recordData.visitDate
    ]);

    return this.findById(result.insertId);
  }

  async findDetailed() {
    if (env.storageMode === "memory") {
      return [...memoryStore.medical_records]
        .map((record) => {
          const patient = memoryStore.patients.find((item) => item.id === record.patient_id);
          const doctor = memoryStore.doctors.find((item) => item.id === record.doctor_id);
          const patientUser = memoryStore.users.find((item) => item.id === patient?.user_id);
          const doctorUser = memoryStore.users.find((item) => item.id === doctor?.user_id);

          return {
            ...record,
            patient_name: patientUser?.full_name || null,
            doctor_name: doctorUser?.full_name || null
          };
        })
        .sort((a, b) => `${b.visit_date}`.localeCompare(`${a.visit_date}`));
    }

    const sql = `
      SELECT
        mr.*,
        up.full_name AS patient_name,
        ud.full_name AS doctor_name
      FROM medical_records mr
      INNER JOIN patients p ON p.id = mr.patient_id
      INNER JOIN doctors d ON d.id = mr.doctor_id
      INNER JOIN users up ON up.id = p.user_id
      INNER JOIN users ud ON ud.id = d.user_id
      ORDER BY mr.visit_date DESC, mr.id DESC
    `;

    return query(sql);
  }
}

export default MedicalRecordRepository;
