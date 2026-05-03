 import { useEffect, useState } from "react";

function Records() {

  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/records", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to load records");
        setRecords([]);
        return;
      }

      setRecords(data.records || data);

    } catch (err) {
      console.error(err);
      setError("Unable to connect to records service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hospital Records</h1>

      {loading && <p className="text-gray-500">Loading records...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && records.length === 0 && (
        <p className="text-gray-500">No records found.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {records.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-gray-500">{r.type}</h2>
            <p className="text-2xl font-bold text-blue-600">{r.count}</p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Records;
