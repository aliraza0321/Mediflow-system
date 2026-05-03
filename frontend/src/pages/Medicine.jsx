 import { useEffect, useState } from "react";

function Medicines() {

  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    expiryDate: "",
  });
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/medicines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Medicines:", data);

      if (!res.ok) {
        setError(data.message || "Unable to load medicines");
        setMedicines([]);
        return;
      }

      setMedicines(data.medicines || data);

    } catch (err) {
      console.error("Medicines error:", err);
      setError("Unable to connect to medicines service");
    } finally {
      setLoading(false);
    }
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || form.stock === "") {
      alert("Medicine name and stock are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Unable to add medicine");
        return;
      }

      setMedicines((items) => [...items, data.medicine].sort((a, b) => a.name.localeCompare(b.name)));
      setForm({ name: "", stock: "", price: "", expiryDate: "" });
    } catch (err) {
      console.error(err);
      alert("Unable to add medicine");
    }
  };

  const updateStock = async (medicine) => {
    const stock = window.prompt("Enter new stock quantity", medicine.stock);
    if (stock === null) return;

    setSavingId(medicine.id);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/medicines/${medicine.id}/stock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stock }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Unable to update stock");
        return;
      }

      setMedicines((items) =>
        items.map((item) =>
          item.id === medicine.id ? { ...item, stock: Number(stock) } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unable to update stock");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Medicine Stock
      </h1>

      {role === "staff" && (
        <form onSubmit={addMedicine} className="bg-white p-5 rounded-xl shadow mb-6 grid md:grid-cols-5 gap-3">
          <input
            placeholder="Medicine"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded"
          />
          <input
            type="number"
            min="0"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="p-3 border rounded"
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 border rounded"
          />
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            className="p-3 border rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>
      )}

      <div className="bg-white p-6 rounded-xl shadow">
        {loading && <p className="text-gray-500">Loading medicines...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && medicines.length === 0 && (
          <p className="text-gray-500">No medicines found.</p>
        )}

        {medicines.length > 0 && <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th>Medicine</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Expiry</th>
              {role === "staff" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {medicines.map((m) => (
              <tr key={m.id} className="border-b">

                <td className="py-2">{m.name}</td>

                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">
                    {m.stock}
                  </span>
                </td>
                <td>{m.price || 0}</td>
                <td>{m.expiryDate ? String(m.expiryDate).slice(0, 10) : "N/A"}</td>
                {role === "staff" && (
                  <td>
                    <button
                      onClick={() => updateStock(m)}
                      disabled={savingId === m.id}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      {savingId === m.id ? "Saving..." : "Update Stock"}
                    </button>
                  </td>
                )}

              </tr>
            ))}
          </tbody>

        </table>}

      </div>
    </div>
  );
}

export default Medicines;
