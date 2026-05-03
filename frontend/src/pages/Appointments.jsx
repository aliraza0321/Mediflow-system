import { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctor/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Appointments:", data);

      if (!res.ok) {
        setError(data.message || "Unable to load appointments");
        setAppointments([]);
        return;
      }

      setAppointments(data.appointments || data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to appointments service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>

      {loading && <p className="text-gray-500">Loading appointments...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && appointments.length === 0 && (
        <p className="text-gray-500">No appointments found.</p>
      )}

      <div className="grid gap-4">
        {appointments.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <p><strong>Patient:</strong> {a.patient}</p>
            <p><strong>Time:</strong> {a.time}</p>
            <p><strong>Status:</strong> {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
