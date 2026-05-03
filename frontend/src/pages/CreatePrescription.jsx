 
 
 import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function CreatePrescription() {

  const { state } = useLocation();
  const navigate = useNavigate();

  // 👇 patient data from navigation
  const patientName = state?.patientName;
  const patientId = state?.patientId;

  // 👇 form state
  const [form, setForm] = useState({
    medicine: "",
    dosage: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      alert("Please open this page from the Patients screen.");
      return;
    }

    if (!form.medicine.trim() || !form.dosage.trim()) {
      alert("Please enter medicine and dosage.");
      return;
    }

    setIsSaving(true);

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

      if (!res.ok) {
        alert(data.message || "Unable to create prescription");
        return;
      }

      alert("Prescription created successfully");
      setForm({ medicine: "", dosage: "" });
      navigate("/prescriptions");

    } catch (err) {
      console.error(err);
      alert("Error creating prescription");
    } finally {
      setIsSaving(false);
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
        disabled={isSaving}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {isSaving ? "Saving..." : "Save"}
      </button>

    </div>
  );
}

export default CreatePrescription;
