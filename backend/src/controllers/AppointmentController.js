class AppointmentController {
  constructor(appointmentService) {
    this.appointmentService = appointmentService;
  }

  create = async (req, res) => {
    const result = await this.appointmentService.create(req.body, req.auth.sub);
    return res.status(201).json(result);
  };
}

module.exports = { AppointmentController };
