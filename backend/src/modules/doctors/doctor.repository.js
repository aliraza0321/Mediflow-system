import BaseRepository from "../../shared/BaseRepository.js";
import { query } from "../../config/database.js";
import env from "../../config/env.js";
import memoryStore from "../../shared/memoryStore.js";

class DoctorRepository extends BaseRepository {
  constructor() {
    super("doctors");
  }

  async create(doctorData) {
    if (env.storageMode === "memory") {
      return this.createMemoryRecord({
        user_id: doctorData.userId,
        specialization: doctorData.specialization,
        license_number: doctorData.licenseNumber,
        availability_notes: doctorData.availabilityNotes || null
      });
    }

    const sql = `
      INSERT INTO doctors (user_id, specialization, license_number, availability_notes)
      VALUES (?, ?, ?, ?)
    `;

    const result = await query(sql, [
      doctorData.userId,
      doctorData.specialization,
      doctorData.licenseNumber,
      doctorData.availabilityNotes || null
    ]);

    return this.findById(result.insertId);
  }

  async findDetailed() {
    if (env.storageMode === "memory") {
      return [...memoryStore.doctors]
        .map((doctor) => {
          const user = memoryStore.users.find((item) => item.id === doctor.user_id);

          return {
            ...doctor,
            full_name: user?.full_name || null,
            email: user?.email || null,
            phone_number: user?.phone_number || null
          };
        })
        .reverse();
    }

    const sql = `
      SELECT
        d.*,
        u.full_name,
        u.email,
        u.phone_number
      FROM doctors d
      INNER JOIN users u ON u.id = d.user_id
      ORDER BY d.id DESC
    `;

    return query(sql);
  }
}

export default DoctorRepository;
