 import { useEffect, useState } from "react";

function Doctors() {

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`, // optional (depends backend)
        },
      });

      const data = await res.json();
      console.log("Doctors:", data);

      if (!res.ok) {
        setError(data.message || "Unable to load doctors");
        setDoctors([]);
        return;
      }

      // ⚠️ adjust based on backend response
      setDoctors(data.doctors || data);

    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Unable to connect to doctors service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doctors</h1>

      {loading && <p className="text-gray-500">Loading doctors...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && doctors.length === 0 && (
        <p className="text-gray-500">No doctors found.</p>
      )}

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
