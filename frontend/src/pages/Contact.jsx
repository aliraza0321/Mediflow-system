import { useState } from "react";

function Contact() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    message: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    if (!form.message.trim()) {
      alert("Please write your message.");
      return;
    }

    if (role !== "patient") {
      alert("Support messages can be sent from patient accounts.");
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: `${form.message.trim()}${form.phone ? ` Phone: ${form.phone}` : ""}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Unable to send message");
        return;
      }

      alert("Message sent successfully");
      setForm({ ...form, message: "" });
    } catch (err) {
      console.error(err);
      alert("Unable to send message");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10">
      <section className="text-center mb-14">
        <h1 className="text-4xl font-bold text-blue-700">
          Contact MediFlow Hospital
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We are available 24/7 for your support. Feel free to reach out for
          appointments, emergencies, or general inquiries.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
        <div className="bg-white p-6 shadow rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-blue-600">Address</h3>
          <p className="text-gray-500 mt-2">
            City Care Hospital, Main Road, Pakistan
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-blue-600">Phone</h3>
          <p className="text-gray-500 mt-2">+92 300 0000000</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-blue-600">Email</h3>
          <p className="text-gray-500 mt-2">support@mediflow.com</p>
        </div>
      </section>

      <section className="flex justify-center mb-16">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Send Us a Message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg h-32 mb-4 focus:outline-blue-400"
          />

          <button
            onClick={sendMessage}
            disabled={isSaving}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSaving ? "Sending..." : "Send Message"}
          </button>
        </div>
      </section>

      <footer className="text-center text-gray-500 border-t pt-6">
        <p className="font-semibold text-gray-700">MediFlow Hospital System</p>

        <p className="mt-2">
          Created by <span className="font-bold text-blue-600">ARM Developers</span>
        </p>

        <p className="text-sm mt-2">2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Contact;
