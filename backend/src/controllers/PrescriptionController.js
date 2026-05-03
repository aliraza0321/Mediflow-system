class PrescriptionController {
  constructor(prescriptionService) {
    this.prescriptionService = prescriptionService;
  }

  list = async (req, res) => {
    return res.status(200).json({
      prescriptions: await this.prescriptionService.listForUser(req.auth),
    });
  };

  create = async (req, res) => {
    const result = await this.prescriptionService.create(req.body, req.auth.sub);
    return res.status(201).json(result);
  };
}

module.exports = { PrescriptionController };
