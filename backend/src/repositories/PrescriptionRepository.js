class PrescriptionRepository {
  constructor(database) {
    this.database = database;
  }

  findAll() {
    return [...this.database.prescriptions];
  }

  findByDoctorId(doctorId) {
    return this.database.prescriptions.filter((item) => item.doctorId === Number(doctorId));
  }

  findByPatientId(patientId) {
    return this.database.prescriptions.filter((item) => item.patientId === Number(patientId));
  }

  create(prescription) {
    this.database.prescriptions.push(prescription);
    return prescription;
  }
}

module.exports = { PrescriptionRepository };
