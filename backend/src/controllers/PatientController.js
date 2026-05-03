class PatientController {
  constructor(patientService, doctorService) {
    this.patientService = patientService;
    this.doctorService = doctorService;
  }

  //getDashboard = async (req, res) => {
  //    //const doctorCount = this.doctorService.getDoctorDirectory().length;
  //    const doctors = await this.doctorService.getDoctorDirectory();// NEW DOC DASHBOARD CHECK
  //    const doctorCount = doctors.length;
  //  /*return res.status(200).json(
  //    this.patientService.getDashboard(req.auth.sub, doctorCount)
  //  );*/
  //    const dashboardData = await this.patientService.getDashboard(req.auth.sub, doctorCount);
  //    return res.status(200).json(dashboardData);

    //};


    getDashboard = async (req, res) => {// new added 
        try {
            const patientId = Number(req.auth.sub);
            if (!patientId) return res.status(400).json({ success: false, message: "Invalid patient ID" });

            const doctors = await this.doctorService.getDoctorDirectory();
            const doctorCount = doctors ? doctors.length : 0;

            const dashboardData = await this.patientService.getDashboard(patientId, doctorCount);
            return res.status(200).json(dashboardData);
        } catch (err) {
            console.error("Dashboard error:", err);
            return res.status(500).json({ success: false, message: err.message });
        }
    };

  getAppointments = async (req, res) => {
    return res.status(200).json({
        //appointments: this.patientService.getAppointments(req.auth.sub),
        appointments: await this.patientService.getAppointments(req.auth.sub),
    });
  };
}

module.exports = { PatientController };
