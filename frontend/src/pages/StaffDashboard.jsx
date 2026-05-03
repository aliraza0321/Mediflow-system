 import { useEffect, useState } from "react";

function StaffDashboard() {

  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    requests: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/staff/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setStats({
        doctors: data.totalDoctors,
        patients: data.totalPatients,
        requests: data.pendingRequests,
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Staff Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Doctors</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.doctors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Patients</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.patients}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Pending Requests</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.requests}
          </p>
        </div>

      </div>
    </div>
  );
}

export default StaffDashboard;