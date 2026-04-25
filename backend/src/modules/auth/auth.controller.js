import asyncHandler from "../../utils/asyncHandler.js";
import AuthService from "./auth.service.js";

const authService = new AuthService();

export const login = asyncHandler(async (req, res) => {
  // Controller: receives request, calls the service, returns JSON response.
  const result = await authService.login(req.body);
  res.status(200).json({ success: true, data: result });
});

export const registerPatient = asyncHandler(async (req, res) => {
  const result = await authService.registerPatient(req.body);
  res.status(201).json({
    success: true,
    message: "Patient registered successfully",
    data: result
  });
});
