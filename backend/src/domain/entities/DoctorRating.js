class DoctorRating {
  constructor({
    id,
    appointmentId,
    doctorId,
    patientId,
    rating,
    createdAt = new Date().toISOString(),
  }) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.rating = rating;
    this.createdAt = createdAt;
  }
}

module.exports = { DoctorRating };
