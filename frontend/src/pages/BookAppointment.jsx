import { useState } from "react";

 function BookAppointment() {

  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Requested (Frontend Only)");
    console.log(form);
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">Book Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="doctor"
          placeholder="Doctor Name"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
       
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="reason"
          placeholder="Reason"
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