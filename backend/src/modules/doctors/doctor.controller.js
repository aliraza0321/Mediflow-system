import asyncHandler from "../../utils/asyncHandler.js";
import DoctorService from "./doctor.service.js";

const doctorService = new DoctorService();

export const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await doctorService.getAll();
  res.status(200).json({ success: true, data: doctors });
});

export const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await doctorService.getById(req.params.id);
  res.status(200).json({ success: true, data: doctor });
});

export const createDoctor = asyncHandler(async (req, res) => {
  const doctor = await doctorService.create(req.body);
  res.status(201).json({ success: true, data: doctor });
});
