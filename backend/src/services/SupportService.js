class SupportService {
  constructor({ supportRepository, userRepository }) {
    this.supportRepository = supportRepository;
    this.userRepository = userRepository;
  }

  list() {
    return this.supportRepository.findAll().map((ticket) => {
      const user = this.userRepository.findById(ticket.userId);
      return {
        id: ticket.id,
        user: user ? user.name : "Unknown User",
        message: ticket.message,
        status: ticket.status,
      };
    });
  }
}

module.exports = { SupportService };
