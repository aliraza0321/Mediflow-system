class RecordService {
  constructor({ userRepository, appointmentRepository, prescriptionRepository }) {
    this.userRepository = userRepository;
    this.appointmentRepository = appointmentRepository;
    this.prescriptionRepository = prescriptionRepository;
  }

  list() {
    return [
      {
        id: 1,
        type: "Users",
        count: this.userRepository.findAll().length,
      },
      {
        id: 2,
        type: "Appointments",
        count: this.appointmentRepository.findAll().length,
      },
      {
        id: 3,
        type: "Prescriptions",
        count: this.prescriptionRepository.findAll().length,
      },
    ];
  }
}

module.exports = { RecordService };
