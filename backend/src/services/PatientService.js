class PatientService {
  constructor({ userRepository, appointmentRepository }) {
    this.userRepository = userRepository;
    this.appointmentRepository = appointmentRepository;
  }

  getDashboard(patientId, availableDoctorCount) {
    const appointments = this.appointmentRepository.findByPatientId(patientId);

    return {
      availableDoctors: availableDoctorCount,
      totalAppointments: appointments.length,
      pendingReports: appointments.filter((item) => item.status !== "completed").length,
    };
  }

  getAppointments(patientId) {
    return this.appointmentRepository.findByPatientId(patientId).map((appointment) => {
      const doctor = this.userRepository.findById(appointment.doctorId);

      return {
        id: appointment.id,
        doctorId: appointment.doctorId,
        doctorName: doctor ? doctor.name : "Unknown Doctor",
        status: appointment.status,
        rated: appointment.rated,
        date: appointment.date,
        reason: appointment.reason,
      };
    });
  }
}

module.exports = { PatientService };
