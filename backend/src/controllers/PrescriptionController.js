class PrescriptionController {
  constructor(prescriptionService) {
    this.prescriptionService = prescriptionService;
  }

  list = async (req, res) => {
    return res.status(200).json({
      prescriptions: this.prescriptionService.listForUser(req.auth),
    });
  };

  create = async (req, res) => {
    const result = this.prescriptionService.create(req.body, req.auth.sub);
    return res.status(201).json(result);
  };
}

module.exports = { PrescriptionController };
