import { useEffect, useState } from "react";

function BookAppointment() {
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to load doctors");
        setDoctors([]);
        return;
      }

      setDoctors(data.doctors || data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Unable to connect to doctors service");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctor.trim() || !form.date || !form.reason.trim()) {
      alert("Please select a doctor, date, and reason");
      return;
    }

    const selectedDoctor = doctors.find(
      (doctor) => doctor.name.toLowerCase() === form.doctor.trim().toLowerCase()
    );

    if (!selectedDoctor) {
      alert("Please enter a valid doctor name from the doctors list");
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          date: form.date,
          reason: form.reason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Unable to book appointment");
        return;
      }

      alert("Appointment booked successfully");
      setForm({
        doctor: "",
        date: "",
        reason: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
      alert("Unable to book appointment");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="doctor"
          placeholder="Doctor Name"
          value={form.doctor}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <button
          disabled={isSaving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isSaving ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
