const { ROLES } = require("../config/roles");
const { UserPresenter } = require("./UserPresenter");

class StaffService {
  constructor({ userRepository, supportRepository }) {
    this.userRepository = userRepository;
    this.supportRepository = supportRepository;
  }

  async getDashboard() {
    const doctors = await this.userRepository.findByRole(ROLES.DOCTOR);
    const patients = await this.userRepository.findByRole(ROLES.PATIENT);
    const supportTickets = await this.supportRepository.findAll();

    return {
      totalDoctors: doctors.length,
      totalPatients: patients.length,
      pendingRequests: supportTickets.filter((ticket) => String(ticket.status).toLowerCase() !== "resolved").length,
    };
  }

  async getAllUsers() {
    return (await this.userRepository.findAll()).map((user) => UserPresenter.toSafeUser(user));
  }
}

module.exports = { StaffService };
