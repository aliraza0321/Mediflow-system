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

  createSupportTicket = async (req, res) => {
    return res.status(201).json(await this.supportService.create(req.body, req.auth.sub));
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

  resolveSupportTicket = async (req, res) => {
    return res.status(200).json(await this.supportService.resolve(req.params.id));
  };

  createMedicine = async (req, res) => {
    return res.status(201).json(await this.medicineService.create(req.body));
  };

  updateMedicineStock = async (req, res) => {
    return res.status(200).json(await this.medicineService.updateStock(req.params.id, req.body));
  };
}

module.exports = { StaffController };
