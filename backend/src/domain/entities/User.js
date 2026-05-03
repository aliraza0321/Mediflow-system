class User {
  constructor({
    id,
    name,
    email,
    phone = "",
    role,
    passwordHash,
    cnic = "",
    dob = "",
    maritalStatus = "Single",
    isActive = true,
    profile = {},
  }) {
    this.id = id;
    this.name = name;
    this.email = email.toLowerCase();
    this.phone = phone;
    this.role = role;
    this.passwordHash = passwordHash;
    this.cnic = cnic;
    this.dob = dob;
    this.maritalStatus = maritalStatus;
    this.isActive = isActive;
    this.profile = profile;
  }
}

module.exports = { User };
