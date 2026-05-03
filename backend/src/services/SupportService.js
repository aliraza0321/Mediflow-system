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
}

module.exports = { SupportService };
