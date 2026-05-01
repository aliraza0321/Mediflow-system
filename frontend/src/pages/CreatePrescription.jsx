 
 
 import { useLocation } from "react-router-dom";
import { useState } from "react";

function CreatePrescription() {

  const { state } = useLocation();

  // 👇 patient data from navigation
  const patientName = state?.patientName;
  const patientId = state?.patientId;

  // 👇 form state
  const [form, setForm] = useState({
    medicine: "",
    dosage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId: patientId,
          medicine: form.medicine,
          dosage: form.dosage,
        }),
      });

      const data = await res.json();
      console.log("Prescription:", data);

      alert("Prescription created successfully");

    } catch (err) {
      console.error(err);
      alert("Error creating prescription");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Prescription for {patientName || "Patient"}
      </h1>

      <input
        placeholder="Medicine"
        value={form.medicine}
        onChange={(e) =>
          setForm({ ...form, medicine: e.target.value })
        }
        className="w-full p-3 border rounded mb-3"
      />

      <input
        placeholder="Dosage"
        value={form.dosage}
        onChange={(e) =>
          setForm({ ...form, dosage: e.target.value })
        }
        className="w-full p-3 border rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save
      </button>

    </div>
  );
}

export default CreatePrescription;