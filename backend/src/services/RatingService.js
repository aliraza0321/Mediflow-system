const { DoctorRating } = require("../domain/entities/DoctorRating");
const { AppError } = require("../core/errors/AppError");
const { ensureRequiredFields } = require("../core/utils/validators");

class RatingService {
  constructor({ database, appointmentRepository, ratingRepository }) {
    this.database = database;
    this.appointmentRepository = appointmentRepository;
    this.ratingRepository = ratingRepository;
  }

  async submit(payload, patientId) {
    ensureRequiredFields(payload, ["doctorId", "appointmentId", "rating"]);

    const appointment = await this.appointmentRepository.findById(payload.appointmentId);
    if (!appointment) {
      throw new AppError("Appointment not found.", 404);
    }

    if (appointment.patientId !== patientId) {
      throw new AppError("You can only rate your own appointments.", 403);
    }

    if (appointment.status !== "completed") {
      throw new AppError("Only completed appointments can be rated.", 400);
    }

    if (appointment.rated || await this.ratingRepository.findByAppointmentId(payload.appointmentId)) {
      throw new AppError("This appointment has already been rated.", 409);
    }

    const numericRating = Number(payload.rating);
    if (numericRating < 1 || numericRating > 5) {
      throw new AppError("Rating must be between 1 and 5.", 400);
    }

    const rating = new DoctorRating({
      appointmentId: Number(payload.appointmentId),
      doctorId: Number(payload.doctorId),
      patientId,
      rating: numericRating,
    });

    const createdRating = await this.ratingRepository.create(rating);
    appointment.rated = true;

    return {
      message: "Rating submitted successfully.",
      rating: createdRating,
    };
  }
}

module.exports = { RatingService };
