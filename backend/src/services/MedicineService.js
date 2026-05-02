class MedicineService {
  constructor({ medicineRepository }) {
    this.medicineRepository = medicineRepository;
  }

  list() {
    return this.medicineRepository.findAll();
  }
}

module.exports = { MedicineService };
