 import { useState } from "react";

function Signup() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cnic: "",
    dob: "",
    role: "patient",
    status: "Single"
  });

  // ✅ INPUT HANDLER
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ API SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Account created successfully");
      } else {
        alert(data.message || "Error creating account");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8"
      >

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account
        </h1>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
          required
        />

        {/* CNIC */}
        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          value={form.cnic}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
        />

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-3"
        >
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="staff">Staff</option>
        </select>

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-5"
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Back to{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>

      </form>

    </div>
  );
}

export default Signup;