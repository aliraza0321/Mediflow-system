import asyncHandler from "../../utils/asyncHandler.js";
import PatientService from "./patient.service.js";

const patientService = new PatientService();

export const getPatients = asyncHandler(async (req, res) => {
  const patients = await patientService.getAll();
  res.status(200).json({ success: true, data: patients });
});

export const getPatientById = asyncHandler(async (req, res) => {
  const patient = await patientService.getById(req.params.id);
  res.status(200).json({ success: true, data: patient });
});

export const createPatient = asyncHandler(async (req, res) => {
  const patient = await patientService.create(req.body);
  res.status(201).json({ success: true, data: patient });
});
