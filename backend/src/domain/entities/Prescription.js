class Prescription {
  constructor({
    id,
    patientId,
    doctorId,
    medicine,
    dosage,
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.medicine = medicine;
    this.dosage = dosage;
    this.createdAt = createdAt;
  }
}

module.exports = { Prescription };
