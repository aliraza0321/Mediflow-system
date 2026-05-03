class MedicineService {
  constructor({ medicineRepository }) {
    this.medicineRepository = medicineRepository;
  }

  async list() {
    return this.medicineRepository.findAll();
  }

  async create(payload) {
    const { AppError } = require("../core/errors/AppError");

    if (!payload.name || payload.stock === undefined || payload.stock === "") {
      throw new AppError("Medicine name and stock are required.", 400);
    }

    if (Number(payload.stock) < 0) {
      throw new AppError("Stock cannot be negative.", 400);
    }

    const medicine = await this.medicineRepository.create(payload);
    return {
      message: "Medicine added successfully.",
      medicine,
    };
  }

  async updateStock(id, payload) {
    const { AppError } = require("../core/errors/AppError");

    if (payload.stock === undefined || payload.stock === "" || Number(payload.stock) < 0) {
      throw new AppError("A valid stock quantity is required.", 400);
    }

    const updated = await this.medicineRepository.updateStock(id, payload.stock);
    if (!updated) {
      throw new AppError("Medicine not found.", 404);
    }

    return {
      message: "Medicine stock updated successfully.",
    };
  }
}

module.exports = { MedicineService };
