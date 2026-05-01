 import { useEffect, useState } from "react";

 function DoctorDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    prescriptions: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctor/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Dashboard:", data);

      setStats({
        patients: data.totalPatients,
        appointments: data.totalAppointments,
        prescriptions: data.totalPrescriptions,
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Doctor Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">My Patients</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {stats.patients}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Appointments</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {stats.appointments}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Prescriptions</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {stats.prescriptions}
          </h2>
        </div>

      </div>
    </div>
  );
}
export default DoctorDashboard;