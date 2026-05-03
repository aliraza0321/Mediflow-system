import { useEffect, useState } from "react";

function BookAppointment() {
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: "",
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setDoctors(data.doctors || data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDoctor = doctors.find(
      (doctor) => doctor.name.toLowerCase() === form.doctor.trim().toLowerCase()
    );

    if (!selectedDoctor) {
      alert("Please enter a valid doctor name from the doctors list");
      return;
    }

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
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

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

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Book
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
