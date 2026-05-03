class SupportTicket {
  constructor({ id, userId, message, status = "Pending" }) {
    this.id = id;
    this.userId = userId;
    this.message = message;
    this.status = status;
  }
}

module.exports = { SupportTicket };
