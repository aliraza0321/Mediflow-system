 import { useEffect, useState } from "react";

function ManageUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Users:", data);

      // adjust based on backend
      setUsers(data.users || data);

    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">

                <td className="py-2">{u.name}</td>
                <td>{u.role}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-sm ${
                    u.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {u.status}
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

export default ManageUsers;