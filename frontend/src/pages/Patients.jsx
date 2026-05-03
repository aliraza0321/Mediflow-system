 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Patients() {

  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctor/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Patients:", data);

      setPatients(data.patients || data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {patients.map((p) => (
        <div key={p.id} className="bg-white p-4 shadow rounded mb-3">

          <p><strong>{p.name}</strong></p>
          <p>Status: {p.status}</p>

          {p.status === "admitted" && (
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
          )}

        </div>
      ))}
    </div>
  );
}

export default Patients;