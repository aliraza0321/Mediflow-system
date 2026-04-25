import BaseRepository from "../../shared/BaseRepository.js";
import { query } from "../../config/database.js";
import env from "../../config/env.js";
import memoryStore from "../../shared/memoryStore.js";
import { nextId } from "../../shared/memoryStore.js";

class BillingRepository extends BaseRepository {
  constructor() {
    super("bills");
  }

  async create(billData) {
    if (env.storageMode === "memory") {
      return this.createMemoryRecord({
        patient_id: Number(billData.patientId),
        appointment_id: billData.appointmentId ? Number(billData.appointmentId) : null,
        amount: Number(billData.amount),
        status: billData.status || "unpaid",
        description: billData.description || null
      });
    }

    const sql = `
      INSERT INTO bills (patient_id, appointment_id, amount, status, description)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      billData.patientId,
      billData.appointmentId || null,
      billData.amount,
      billData.status || "unpaid",
      billData.description || null
    ]);

    return this.findById(result.insertId);
  }

  async createPayment(paymentData) {
    if (env.storageMode === "memory") {
      const payment = {
        id: nextId("payments"),
        bill_id: Number(paymentData.billId),
        amount_paid: Number(paymentData.amountPaid),
        payment_method: paymentData.paymentMethod,
        payment_status: paymentData.paymentStatus,
        created_at: new Date().toISOString()
      };

      memoryStore.payments.push(payment);
      return payment;
    }

    const sql = `
      INSERT INTO payments (bill_id, amount_paid, payment_method, payment_status)
      VALUES (?, ?, ?, ?)
    `;

    const result = await query(sql, [
      paymentData.billId,
      paymentData.amountPaid,
      paymentData.paymentMethod,
      paymentData.paymentStatus
    ]);

    const rows = await query(`SELECT * FROM payments WHERE id = ?`, [result.insertId]);
    return rows[0] || null;
  }

  async updateBillStatus(billId, status) {
    if (env.storageMode === "memory") {
      const bill = memoryStore.bills.find((item) => item.id === Number(billId));

      if (bill) {
        bill.status = status;
      }

      return bill || null;
    }

    await query(`UPDATE bills SET status = ? WHERE id = ?`, [status, billId]);
    return this.findById(billId);
  }

  async findDetailed() {
    if (env.storageMode === "memory") {
      return [...memoryStore.bills]
        .map((bill) => {
          const patient = memoryStore.patients.find((item) => item.id === bill.patient_id);
          const user = memoryStore.users.find((item) => item.id === patient?.user_id);

          return {
            ...bill,
            patient_name: user?.full_name || null
          };
        })
        .reverse();
    }

    const sql = `
      SELECT
        b.*,
        u.full_name AS patient_name
      FROM bills b
      INNER JOIN patients p ON p.id = b.patient_id
      INNER JOIN users u ON u.id = p.user_id
      ORDER BY b.id DESC
    `;

    return query(sql);
  }
}

export default BillingRepository;
