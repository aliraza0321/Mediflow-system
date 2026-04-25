import asyncHandler from "../../utils/asyncHandler.js";
import MedicalRecordService from "./medicalRecord.service.js";

const medicalRecordService = new MedicalRecordService();

export const getMedicalRecords = asyncHandler(async (req, res) => {
  const records = await medicalRecordService.getAll();
  res.status(200).json({ success: true, data: records });
});

export const getMedicalRecordById = asyncHandler(async (req, res) => {
  const record = await medicalRecordService.getById(req.params.id);
  res.status(200).json({ success: true, data: record });
});

export const createMedicalRecord = asyncHandler(async (req, res) => {
  const record = await medicalRecordService.create(req.body);
  res.status(201).json({ success: true, data: record });
});
