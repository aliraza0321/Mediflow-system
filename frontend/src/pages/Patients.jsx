 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Patients() {

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctor/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Patients:", data);

      if (!res.ok) {
        setError(data.message || "Unable to load patients");
        setPatients([]);
        return;
      }

      setPatients(data.patients || data);

    } catch (err) {
      console.error(err);
      setError("Unable to connect to patients service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {loading && <p className="text-gray-500">Loading patients...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && patients.length === 0 && (
        <p className="text-gray-500">No assigned patients found.</p>
      )}

      {patients.map((p) => (
        <div key={p.id} className="bg-white p-4 shadow rounded mb-3">

          <p><strong>{p.name}</strong></p>
          <p>Status: {p.status}</p>

          <button
            onClick={() =>
              navigate("/create-prescription", {
                state: {
                  patientId: p.id,
                  patientName: p.name,
                },
              })
            }
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Create Prescription
          </button>

        </div>
      ))}
    </div>
  );
}

export default Patients;
