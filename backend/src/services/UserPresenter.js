class UserPresenter {
  static toSafeUser(user, computed = {}) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      cnic: user.cnic,
      dob: user.dob,
      status: user.isActive ? "Active" : "Inactive",
      ...user.profile,
      ...computed,
    };
  }
}

module.exports = { UserPresenter };
