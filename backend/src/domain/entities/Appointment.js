class Appointment {
  constructor({
    id,
    patientId,
    doctorId,
    date,
    reason,
    status = "scheduled",
    rated = false,
  }) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.reason = reason;
    this.status = status;
    this.rated = rated;
  }
}

module.exports = { Appointment };
