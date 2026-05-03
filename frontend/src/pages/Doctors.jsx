 import { useEffect, useState } from "react";

function Doctors() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`, // optional (depends backend)
        },
      });

      const data = await res.json();
      console.log("Doctors:", data);

      // ⚠️ adjust based on backend response
      setDoctors(data.doctors || data);

    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doctors</h1>

      <div className="grid md:grid-cols-3 gap-6">

        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-xl transition"
          >

            <h2 className="text-xl font-bold text-blue-600">
              {doc.name}
            </h2>

            <p className="text-gray-600">
              {doc.specialty || doc.specialization}
            </p>

            <p className="text-yellow-500 font-semibold">
              ⭐ {doc.rating || "N/A"}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Doctors;