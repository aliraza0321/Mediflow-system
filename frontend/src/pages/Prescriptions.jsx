 import { useEffect, useState } from "react";

function Prescriptions() {

  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/prescriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Prescriptions:", data);

      setPrescriptions(data.prescriptions || data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>

      <div className="bg-white p-6 rounded-xl shadow">

        {prescriptions.map((p) => (
          <div key={p.id} className="border-b py-3">

            <p><strong>Patient:</strong> {p.patientName}</p>
            <p><strong>Medicine:</strong> {p.medicine}</p>
            <p><strong>Dosage:</strong> {p.dosage}</p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Prescriptions;