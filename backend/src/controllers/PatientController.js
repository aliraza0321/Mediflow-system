class PatientController {
  constructor(patientService, doctorService) {
    this.patientService = patientService;
    this.doctorService = doctorService;
  }

  getDashboard = async (req, res) => {
    const doctorCount = this.doctorService.getDoctorDirectory().length;
    return res.status(200).json(
      this.patientService.getDashboard(req.auth.sub, doctorCount)
    );
  };

  getAppointments = async (req, res) => {
    return res.status(200).json({
      appointments: this.patientService.getAppointments(req.auth.sub),
    });
  };
}

module.exports = { PatientController };
