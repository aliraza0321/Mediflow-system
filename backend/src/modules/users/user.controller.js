import asyncHandler from "../../utils/asyncHandler.js";
import UserService from "./user.service.js";

const userService = new UserService();

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json({ success: true, data: users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.status(200).json({ success: true, data: user });
});
