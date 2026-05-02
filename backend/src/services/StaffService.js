const { ROLES } = require("../config/roles");
const { UserPresenter } = require("./UserPresenter");

class StaffService {
  constructor({ userRepository, supportRepository }) {
    this.userRepository = userRepository;
    this.supportRepository = supportRepository;
  }

  getDashboard() {
    return {
      totalDoctors: this.userRepository.findByRole(ROLES.DOCTOR).length,
      totalPatients: this.userRepository.findByRole(ROLES.PATIENT).length,
      pendingRequests: this.supportRepository.findAll().filter((ticket) => ticket.status !== "Resolved").length,
    };
  }

  getAllUsers() {
    return this.userRepository.findAll().map((user) => UserPresenter.toSafeUser(user));
  }
}

module.exports = { StaffService };
