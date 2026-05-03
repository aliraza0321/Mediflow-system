const express = require("express");

const { authenticate } = require("../core/middleware/authenticate");
const { authorize } = require("../core/middleware/authorize");
const { asyncHandler } = require("../core/utils/asyncHandler");
const { ROLES } = require("../config/roles");

function buildRoutes(controllers) {
  const router = express.Router();

  router.get("/health", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "MediFlow backend is running.",
    });
  });

  router.post("/auth/signup", asyncHandler(controllers.auth.signup));
  router.post("/auth/login", asyncHandler(controllers.auth.login));
  router.post("/auth/forgot-password", asyncHandler(controllers.auth.forgotPassword));

  router.get(
    "/doctor/dashboard",
    authenticate,
    authorize(ROLES.DOCTOR),
    asyncHandler(controllers.doctor.getDashboard)
  );
  router.get(
    "/doctor/patients",
    authenticate,
    authorize(ROLES.DOCTOR),
    asyncHandler(controllers.doctor.getPatients)
  );
  router.get(
    "/doctor/appointments",
    authenticate,
    authorize(ROLES.DOCTOR),
    asyncHandler(controllers.doctor.getAppointments)
  );

  router.get(
    "/patient/dashboard",
    authenticate,
    authorize(ROLES.PATIENT),
    asyncHandler(controllers.patient.getDashboard)
  );
  router.get(
    "/patient/appointments",
    authenticate,
    authorize(ROLES.PATIENT),
    asyncHandler(controllers.patient.getAppointments)
  );

  router.get(
    "/staff/dashboard",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.getDashboard)
  );
  router.get(
    "/admin/users",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.getUsers)
  );
  router.get(
    "/support",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.getSupportTickets)
  );
  router.post(
    "/support",
    authenticate,
    authorize(ROLES.PATIENT),
    asyncHandler(controllers.staff.createSupportTicket)
  );
  router.patch(
    "/support/:id/resolve",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.resolveSupportTicket)
  );
  router.get(
    "/records",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.getRecords)
  );
  router.get(
    "/medicines",
    authenticate,
    authorize(ROLES.DOCTOR, ROLES.STAFF),
    asyncHandler(controllers.staff.getMedicines)
  );
  router.post(
    "/medicines",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.createMedicine)
  );
  router.patch(
    "/medicines/:id/stock",
    authenticate,
    authorize(ROLES.STAFF),
    asyncHandler(controllers.staff.updateMedicineStock)
  );

  router.get("/doctors", authenticate, asyncHandler(controllers.doctor.getDirectory));

  router.get(
    "/prescriptions",
    authenticate,
    authorize(ROLES.DOCTOR, ROLES.PATIENT),
    asyncHandler(controllers.prescription.list)
  );
  router.post(
    "/prescriptions",
    authenticate,
    authorize(ROLES.DOCTOR),
    asyncHandler(controllers.prescription.create)
  );

  router.post(
    "/appointments",
    authenticate,
    authorize(ROLES.PATIENT),
    asyncHandler(controllers.appointment.create)
  );

  router.post(
    "/rate-doctor",
    authenticate,
    authorize(ROLES.PATIENT),
    asyncHandler(controllers.rating.create)
  );

  return router;
}

module.exports = { buildRoutes };
