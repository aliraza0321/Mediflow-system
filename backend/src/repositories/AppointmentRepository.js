//class AppointmentRepository {
//  constructor(db) {
//    this.db = db;
//  }

//  async findAll() {
//      //return [...this.database.appointments];
//      const rows = await this.db.query("SELECT * FROM appointments");
//      return rows;
//  }

//  async findById(id) {
//      //return this.database.appointments.find((item) => item.id === Number(id)) || null;
//      const rows = await this.db.query("SELECT * FROM appointments WHERE id = ?", [Number(id)]);
//      return rows[0] || null;
//  }

//  async findByDoctorId(doctorId) {
//      //return this.database.appointments.filter((item) => item.doctorId === Number(doctorId));
//      const [rows] = await this.db.query(
//          "SELECT * FROM appointments WHERE doctor_id = ?",
//          [doctorId]
//      );
//      return rows;
//  }

//  async findByPatientId(patientId) {
//      //return this.database.appointments.filter((item) => item.patientId === Number(patientId));

//      const [rows] = await this.db.query(
//          "SELECT * FROM appointments WHERE patient_id = ?",
//          [patientId]
//      );
//      return rows;
//  }

//  /*create(appointment) {
//    this.database.appointments.push(appointment);
//    return appointment;
//  }

//  update(appointment) {
//    const index = this.database.appointments.findIndex((item) => item.id === appointment.id);
//    this.database.appointments[index] = appointment;
//    return appointment;
//  }*/
//    async create(appointment) {
//        const query = `
//      INSERT INTO appointments (patient_id, doctor_id, date, reason, status, rated)
//      VALUES (?, ?, ?, ?, ?, ?)
//    `;
//        const params = [
//            appointment.patientId,
//            appointment.doctorId,
//            appointment.date,
//            appointment.reason,
//            appointment.status || 'scheduled',
//            appointment.rated || false
//        ];

//        const result = await this.db.query(query, params);

//        // Return the appointment with the new ID from MariaDB
//        return { id: Number(result.insertId), ...appointment };
//    }

//    async update(appointment) {
//        const query = `
//      UPDATE appointments 
//      SET status = ?, rated = ?, reason = ?, date = ?
//      WHERE id = ?
//    `;
//        const params = [
//            appointment.status,
//            appointment.rated,
//            appointment.reason,
//            appointment.date,
//            appointment.id
//        ];

//        await this.db.query(query, params);
//        return appointment;
//    }
//}

//module.exports = { AppointmentRepository };


class AppointmentRepository {
    constructor(db) {
        this.db = db;
    }

    async findAll() {
        const [rows] = await this.db.query(this.baseQuery("ORDER BY a.appointment_date DESC, a.appointment_time DESC"));
        return rows.map((row) => this.toAppointment(row));
    }

    async findById(id) {
        const [rows] = await this.db.query(
            this.baseQuery("WHERE a.id = ?"),
            [Number(id)]
        );
        return rows[0] ? this.toAppointment(rows[0]) : null;
    }

    baseQuery(tail = "") {
        return `
            SELECT
                a.id,
                pu.id AS patient_user_id,
                du.id AS doctor_user_id,
                a.appointment_date,
                a.appointment_time,
                a.status,
                a.reason,
                a.created_at,
                CASE WHEN r.id IS NULL THEN 0 ELSE 1 END AS rated
            FROM appointments a
            JOIN patients p ON p.id = a.patient_id
            JOIN users pu ON pu.id = p.user_id
            JOIN doctors d ON d.id = a.doctor_id
            JOIN users du ON du.id = d.user_id
            LEFT JOIN ratings r ON r.appointment_id = a.id
            ${tail}
        `;
    }

    toAppointment(row) {
        return {
            id: row.id,
            patientId: row.patient_user_id,
            doctorId: row.doctor_user_id,
            date: row.appointment_date,
            appointment_date: row.appointment_date,
            appointment_time: row.appointment_time,
            status: row.status,
            reason: row.reason,
            rated: Boolean(row.rated),
            createdAt: row.created_at,
        };
    }

    async findByDoctorId(doctorUserId) {
        const [rows] = await this.db.query(
            this.baseQuery("WHERE du.id = ? ORDER BY a.appointment_date DESC, a.appointment_time DESC"),
            [Number(doctorUserId)]
        );
        return rows.map((row) => this.toAppointment(row));
    }

    async findByPatientId(patientUserId) {
        const [rows] = await this.db.query(
            this.baseQuery("WHERE pu.id = ? ORDER BY a.appointment_date DESC, a.appointment_time DESC"),
            [Number(patientUserId)]
        );
        return rows.map((row) => this.toAppointment(row));
    }

    async create(appointment) {
        const [[patient]] = await this.db.query("SELECT id FROM patients WHERE user_id = ?", [appointment.patientId]);
        const [[doctor]] = await this.db.query("SELECT id FROM doctors WHERE user_id = ?", [appointment.doctorId]);

        if (!patient || !doctor) {
            throw new Error("Patient or doctor profile is missing in the database.");
        }

        const query = `
      INSERT INTO appointments 
      (patient_id, doctor_id, appointment_date, appointment_time, status, reason)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        const params = [
            patient.id,
            doctor.id,
            appointment.date,
            appointment.time || "10:00:00",
            appointment.status || "pending",
            appointment.reason || null
        ];

        const [result] = await this.db.query(query, params);

        return { id: Number(result.insertId), ...appointment };
    }

    async update(appointment) {
        const query = `
      UPDATE appointments 
      SET status = ?, reason = ?, appointment_date = ?, appointment_time = ?
      WHERE id = ?
    `;

        const params = [
            appointment.status,
            appointment.reason,
            appointment.date || appointment.appointment_date,
            appointment.time || appointment.appointment_time || "10:00:00",
            appointment.id
        ];

        await this.db.query(query, params);

        return appointment;
    }
}

module.exports = { AppointmentRepository };
