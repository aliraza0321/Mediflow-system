class RecordService {
  constructor({ userRepository, appointmentRepository, prescriptionRepository }) {
    this.userRepository = userRepository;
    this.appointmentRepository = appointmentRepository;
    this.prescriptionRepository = prescriptionRepository;
  }

  async list() {
    const users = await this.userRepository.findAll();
    const appointments = await this.appointmentRepository.findAll();
    const prescriptions = await this.prescriptionRepository.findAll();

    return [
      {
        id: 1,
        type: "Users",
        count: users.length,
      },
      {
        id: 2,
        type: "Appointments",
        count: appointments.length,
      },
      {
        id: 3,
        type: "Prescriptions",
        count: prescriptions.length,
      },
    ];
  }
}

module.exports = { RecordService };
