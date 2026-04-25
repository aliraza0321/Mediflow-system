import BaseService from "../../shared/BaseService.js";
import BillingRepository from "./billing.repository.js";
import PatientRepository from "../patients/patient.repository.js";
import AppointmentRepository from "../appointments/appointment.repository.js";
import { requireFields } from "../../utils/validation.js";
import ApiError from "../../utils/ApiError.js";
import { paymentStrategyFactory } from "./paymentStrategies.js";

class BillingService extends BaseService {
  constructor() {
    super(new BillingRepository(), "Bill");
    this.patientRepository = new PatientRepository();
    this.appointmentRepository = new AppointmentRepository();
  }

  async getAll() {
    return this.repository.findDetailed();
  }

  async create(payload) {
    requireFields(payload, ["patientId", "amount"]);

    const patient = await this.patientRepository.findById(payload.patientId);

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    if (payload.appointmentId) {
      const appointment = await this.appointmentRepository.findById(payload.appointmentId);

      if (!appointment) {
        throw new ApiError(404, "Appointment not found");
      }
    }

    return this.repository.create(payload);
  }

  async processPayment(billId, payload) {
    requireFields(payload, ["paymentMethod"]);

    const bill = await this.getById(billId);
    const strategy = paymentStrategyFactory(payload.paymentMethod);

    // Polymorphism happens here:
    // each payment strategy decides how payment should be processed.
    const paymentResult = strategy.processPayment(bill.amount);

    const payment = await this.repository.createPayment({
      billId,
      ...paymentResult
    });

    const newBillStatus =
      paymentResult.paymentStatus === "paid" ? "paid" : "pending";

    // After creating a payment record, we also update the bill status.
    const updatedBill = await this.repository.updateBillStatus(billId, newBillStatus);

    return {
      bill: updatedBill,
      payment
    };
  }
}

export default BillingService;
