class StaffController {
  constructor(staffService, supportService, recordService, medicineService) {
    this.staffService = staffService;
    this.supportService = supportService;
    this.recordService = recordService;
    this.medicineService = medicineService;
  }

  getDashboard = async (_req, res) => {
    return res.status(200).json(this.staffService.getDashboard());
  };

  getUsers = async (_req, res) => {
    return res.status(200).json({
      users: this.staffService.getAllUsers(),
    });
  };

  getSupportTickets = async (_req, res) => {
    return res.status(200).json({
      queries: this.supportService.list(),
    });
  };

  getRecords = async (_req, res) => {
    return res.status(200).json({
      records: this.recordService.list(),
    });
  };

  getMedicines = async (_req, res) => {
    return res.status(200).json({
      medicines: this.medicineService.list(),
    });
  };
}

module.exports = { StaffController };
