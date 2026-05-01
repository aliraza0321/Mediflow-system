import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./layout/MainLayout";
import DoctorDashboard from "./pages/DoctorDashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import StaffDashboard from "./pages/StaffDashboard";
import ManageUsers from "./pages/ManageUsers";
import Support from "./pages/Support";
import Records from "./pages/Records";
import Medicines from "./pages/Medicine";
import RateDoctor from "./pages/RateDoctor";
import CreatePrescription from "./pages/CreatePrescription";
function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<DoctorDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/create-prescription" element={<CreatePrescription />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/prescriptions" element={<Prescriptions />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/rate-doctor" element={<RateDoctor />} />
          <Route path="/bookappointment" element={<BookAppointment />} />

         <Route path="/pharmacy" element={<Medicines />} />

          {/* STAFF */}
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/records" element={<Records />} />
        </Route>


      </Routes>

    </>
  );
}

export default App;