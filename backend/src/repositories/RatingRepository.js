class RatingRepository {
  constructor(database) {
    this.database = database;
  }

  findByDoctorId(doctorId) {
    return this.database.ratings.filter((item) => item.doctorId === Number(doctorId));
  }

  findByAppointmentId(appointmentId) {
    return this.database.ratings.find((item) => item.appointmentId === Number(appointmentId)) || null;
  }

  create(rating) {
    this.database.ratings.push(rating);
    return rating;
  }
}

module.exports = { RatingRepository };
