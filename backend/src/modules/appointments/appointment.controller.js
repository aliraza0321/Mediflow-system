import asyncHandler from "../../utils/asyncHandler.js";
import AppointmentService from "./appointment.service.js";

const appointmentService = new AppointmentService();

export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAll();
  res.status(200).json({ success: true, data: appointments });
});

export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.getById(req.params.id);
  res.status(200).json({ success: true, data: appointment });
});

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.create(req.body);
  res.status(201).json({ success: true, data: appointment });
});
