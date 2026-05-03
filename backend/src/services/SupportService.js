const { AppError } = require("../core/errors/AppError");

class SupportService {
  constructor({ supportRepository, userRepository }) {
    this.supportRepository = supportRepository;
    this.userRepository = userRepository;
  }

  async list() {
    const tickets = await this.supportRepository.findAll();
    return Promise.all(tickets.map(async (ticket) => {
      const user = await this.userRepository.findById(ticket.userId);
      return {
        id: ticket.id,
        user: user ? user.name : "Unknown User",
        message: ticket.message,
        status: ticket.status,
      };
    }));
  }

  async resolve(id) {
    const updated = await this.supportRepository.updateStatus(id, "Resolved");
    if (!updated) {
      throw new AppError("Support ticket not found.", 404);
    }

    return {
      message: "Support ticket resolved successfully.",
    };
  }

  async create(payload, userId) {
    if (!payload.message || !payload.message.trim()) {
      throw new AppError("Message is required.", 400);
    }

    const patientId = await this.userRepository.getPatientProfileId(userId);
    if (!patientId) {
      throw new AppError("Only patient accounts can send support messages.", 403);
    }

    const staff = await this.userRepository.findByRole("staff");
    if (!staff.length) {
      throw new AppError("No staff account is available to receive support messages.", 400);
    }

    const ticket = await this.supportRepository.create({
      patientId,
      staffId: staff[0].id,
      issue: payload.message.trim(),
    });

    return {
      message: "Support message sent successfully.",
      ticket,
    };
  }
}

module.exports = { SupportService };
