
 import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import DoctorLayout from "./pages/doctor/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/doctor/Appointments";
import Patients from "./pages/doctor/Patients";
import Prescriptions from "./pages/doctor/Prescriptions";
import Pharmacy from "./pages/doctor/Pharmacy";
 
<Route
  path="/doctor"
  element={
    <ProtectedRoute role="doctor">
      <DoctorLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DoctorDashboard />} />
  <Route path="appointments" element={<Appointments />} />
  <Route path="patients" element={<Patients />} />
  <Route path="prescriptions" element={<Prescriptions />} />
  <Route path="pharmacy" element={<Pharmacy />} />
</Route>
