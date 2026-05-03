 import { useEffect, useState } from "react";

function Prescriptions() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/prescriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Prescriptions:", data);

      if (!res.ok) {
        setError(data.message || "Unable to load prescriptions");
        setPrescriptions([]);
        return;
      }

      setPrescriptions(data.prescriptions || data);

    } catch (err) {
      console.error(err);
      setError("Unable to connect to prescriptions service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        {loading && <p className="text-gray-500">Loading prescriptions...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && prescriptions.length === 0 && (
          <p className="text-gray-500">No prescriptions found.</p>
        )}

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
