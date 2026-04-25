import asyncHandler from "../../utils/asyncHandler.js";
import BillingService from "./billing.service.js";

const billingService = new BillingService();

export const getBills = asyncHandler(async (req, res) => {
  const bills = await billingService.getAll();
  res.status(200).json({ success: true, data: bills });
});

export const getBillById = asyncHandler(async (req, res) => {
  const bill = await billingService.getById(req.params.id);
  res.status(200).json({ success: true, data: bill });
});

export const createBill = asyncHandler(async (req, res) => {
  const bill = await billingService.create(req.body);
  res.status(201).json({ success: true, data: bill });
});

export const payBill = asyncHandler(async (req, res) => {
  const result = await billingService.processPayment(req.params.id, req.body);
  res.status(200).json({ success: true, data: result });
});
