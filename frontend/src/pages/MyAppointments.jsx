 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/patient/appointments", {
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
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {loading && <p className="text-gray-500">Loading appointments...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && appointments.length === 0 && (
        <p className="text-gray-500">No appointments found.</p>
      )}

      <div className="space-y-4">

        {appointments.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-xl shadow">

            <p><strong>Doctor:</strong> {a.doctorName}</p>
            <p><strong>Status:</strong> {a.status}</p>

            {!a.rated && (
              <button
                onClick={() =>
                  navigate("/rate-doctor", {
                    state: {
                      doctorId: a.doctorId,
                      doctorName: a.doctorName,
                      appointmentId: a.id,
                    },
                  })
                }
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              >
                Rate Doctor
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default MyAppointments;
