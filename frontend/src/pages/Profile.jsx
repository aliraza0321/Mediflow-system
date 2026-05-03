 import { useOutletContext } from "react-router-dom";

import DoctorProfile from "../components/DoctorProfile";
import PatientProfile from "../components/PatientProfile";
import StaffProfile from "../components/StaffProfile";

export default function Profile() {

  const { role } = useOutletContext();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        My Profile
      </h1>

      {/* COMMON INFO */}
      <div className="mb-4">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      {/* ROLE BASED COMPONENTS */}
      {role === "doctor" && <DoctorProfile data={user} />}
      {role === "patient" && <PatientProfile data={user} />}
      {role === "staff" && <StaffProfile data={user} />}

    </div>
  );
}