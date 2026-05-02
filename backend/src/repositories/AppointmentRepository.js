class AppointmentRepository {
  constructor(database) {
    this.database = database;
  }

  findAll() {
    return [...this.database.appointments];
  }

  findById(id) {
    return this.database.appointments.find((item) => item.id === Number(id)) || null;
  }

  findByDoctorId(doctorId) {
    return this.database.appointments.filter((item) => item.doctorId === Number(doctorId));
  }

  findByPatientId(patientId) {
    return this.database.appointments.filter((item) => item.patientId === Number(patientId));
  }

  create(appointment) {
    this.database.appointments.push(appointment);
    return appointment;
  }

  update(appointment) {
    const index = this.database.appointments.findIndex((item) => item.id === appointment.id);
    this.database.appointments[index] = appointment;
    return appointment;
  }
}

module.exports = { AppointmentRepository };
