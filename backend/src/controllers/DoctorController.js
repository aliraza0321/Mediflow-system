class DoctorController {
  constructor(doctorService, prescriptionRepository) {
    this.doctorService = doctorService;
    this.prescriptionRepository = prescriptionRepository;
  }

  getDashboard = async (req, res) => {
    const data = this.doctorService.getDoctorDashboard(req.auth.sub);
    data.totalPrescriptions = this.prescriptionRepository.findByDoctorId(req.auth.sub).length;
    return res.status(200).json(data);
  };

  getPatients = async (req, res) => {
    return res.status(200).json({
      patients: this.doctorService.getAssignedPatients(req.auth.sub),
    });
  };

  getAppointments = async (req, res) => {
    return res.status(200).json({
      appointments: this.doctorService.getAppointments(req.auth.sub),
    });
  };

  getDirectory = async (_req, res) => {
    return res.status(200).json({
      doctors: this.doctorService.getDoctorDirectory(),
    });
  };
}

module.exports = { DoctorController };
