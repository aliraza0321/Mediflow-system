 import { useEffect, useState } from "react";

function Records() {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/records", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRecords(data.records || data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hospital Records</h1>

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