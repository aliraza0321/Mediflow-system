 import { useEffect, useState } from "react";

function PatientDashboard() {

  const [stats, setStats] = useState({
    doctors: 0,
    appointments: 0,
    reports: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/patient/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Patient Dashboard:", data);

      setStats({
        doctors: data.availableDoctors,
        appointments: data.totalAppointments,
        reports: data.pendingReports,
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Patient Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Available Doctors</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.doctors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">My Appointments</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.appointments}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Reports</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.reports}
          </p>
        </div>

      </div>
    </div>
  );
}

export default PatientDashboard;