class StaffController {
  constructor(staffService, supportService, recordService, medicineService) {
    this.staffService = staffService;
    this.supportService = supportService;
    this.recordService = recordService;
    this.medicineService = medicineService;
  }

  getDashboard = async (_req, res) => {
    return res.status(200).json(await this.staffService.getDashboard());
  };

  getUsers = async (_req, res) => {
    return res.status(200).json({
      users: await this.staffService.getAllUsers(),
    });
  };

  getSupportTickets = async (_req, res) => {
    return res.status(200).json({
      queries: await this.supportService.list(),
    });
  };

  getRecords = async (_req, res) => {
    return res.status(200).json({
      records: await this.recordService.list(),
    });
  };

  getMedicines = async (_req, res) => {
    return res.status(200).json({
      medicines: await this.medicineService.list(),
    });
  };
}

module.exports = { StaffController };
