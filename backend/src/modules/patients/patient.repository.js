import BaseRepository from "../../shared/BaseRepository.js";
import { query } from "../../config/database.js";
import env from "../../config/env.js";
import memoryStore from "../../shared/memoryStore.js";

class PatientRepository extends BaseRepository {
  constructor() {
    super("patients");
  }

  async create(patientData) {
    if (env.storageMode === "memory") {
      return this.createMemoryRecord({
        user_id: patientData.userId,
        gender: patientData.gender,
        date_of_birth: patientData.dateOfBirth,
        blood_group: patientData.bloodGroup || null,
        address: patientData.address || null,
        emergency_contact_name: patientData.emergencyContactName || null,
        emergency_contact_phone: patientData.emergencyContactPhone || null
      });
    }

    const sql = `
      INSERT INTO patients (
        user_id, gender, date_of_birth, blood_group, address,
        emergency_contact_name, emergency_contact_phone
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      patientData.userId,
      patientData.gender,
      patientData.dateOfBirth,
      patientData.bloodGroup || null,
      patientData.address || null,
      patientData.emergencyContactName || null,
      patientData.emergencyContactPhone || null
    ]);

    return this.findById(result.insertId);
  }

  async findDetailed() {
    if (env.storageMode === "memory") {
      return [...memoryStore.patients]
        .map((patient) => {
          const user = memoryStore.users.find((item) => item.id === patient.user_id);

          return {
            ...patient,
            full_name: user?.full_name || null,
            email: user?.email || null,
            phone_number: user?.phone_number || null
          };
        })
        .reverse();
    }

    const sql = `
      SELECT
        p.*,
        u.full_name,
        u.email,
        u.phone_number
      FROM patients p
      INNER JOIN users u ON u.id = p.user_id
      ORDER BY p.id DESC
    `;

    return query(sql);
  }
}

export default PatientRepository;
