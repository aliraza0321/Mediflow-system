 import { useEffect, useState } from "react";

function Support() {

  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/support", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setQueries(data.queries || data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Support Center</h1>

      <div className="space-y-4">

        {queries.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-xl shadow">

            <p><strong>User:</strong> {q.user}</p>
            <p><strong>Message:</strong> {q.message}</p>

            <p className={`font-semibold ${
              q.status === "Resolved" ? "text-green-600" : "text-yellow-600"
            }`}>
              {q.status}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Support;