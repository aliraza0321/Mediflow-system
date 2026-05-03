class MedicineService {
  constructor({ medicineRepository }) {
    this.medicineRepository = medicineRepository;
  }

  async list() {
    return this.medicineRepository.findAll();
  }
}

module.exports = { MedicineService };
