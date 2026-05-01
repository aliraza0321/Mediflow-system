 import { useEffect, useState } from "react";

function Medicines() {

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/medicines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Medicines:", data);

      setMedicines(data.medicines || data);

    } catch (err) {
      console.error("Medicines error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Medicine Stock
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th>Medicine</th>
              <th>Stock</th>
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

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Medicines;