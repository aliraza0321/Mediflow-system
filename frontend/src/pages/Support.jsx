 import { useEffect, useState } from "react";

function Support() {

  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/support", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to load support tickets");
        setQueries([]);
        return;
      }

      setQueries(data.queries || data);

    } catch (err) {
      console.error(err);
      setError("Unable to connect to support service");
    } finally {
      setLoading(false);
    }
  };

  const resolveTicket = async (id) => {
    setSavingId(id);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/support/${id}/resolve`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Unable to resolve ticket");
        return;
      }

      setQueries((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status: "Resolved" } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unable to resolve ticket");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Support Center</h1>

      <div className="space-y-4">
        {loading && <p className="text-gray-500">Loading support tickets...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && queries.length === 0 && (
          <p className="text-gray-500">No support tickets found.</p>
        )}

        {queries.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-xl shadow">

            <p><strong>User:</strong> {q.user}</p>
            <p><strong>Message:</strong> {q.message}</p>

            <p className={`font-semibold ${
              q.status === "Resolved" ? "text-green-600" : "text-yellow-600"
            }`}>
              {q.status}
            </p>

            {q.status !== "Resolved" && (
              <button
                onClick={() => resolveTicket(q.id)}
                disabled={savingId === q.id}
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
              >
                {savingId === q.id ? "Resolving..." : "Resolve"}
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Support;
