import { useNavigate } from "react-router-dom";

function Sidebar({ role, setActivePage }) {
      const navigate = useNavigate();
    return (
        <aside className="w-64 bg-white shadow-lg p-5">

            <h2 className="text-xl font-bold mb-6 text-blue-600">
                🏥 MFS
            </h2>

            <p className="text-sm text-gray-400 mb-4">
                Role: {role}
            </p>

            <div className="space-y-2 text-gray-700">

                {role === "doctor" && (
                    <>
                        <p
                            onClick={() => navigate("/profile")}
                            className="cursor-pointer hover:bg-blue-50 p-2 rounded"
                        >
                            My Profile
                        </p>
                        <p onClick={() => navigate("/dashboard")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Dashboard
                        </p>

                        <p onClick={() => navigate("/patients")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Patients
                        </p>

                        <p onClick={() => navigate("/appointments")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Appointments
                        </p>

                        <p onClick={() => navigate("/prescriptions")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Prescriptions
                        </p>
                        <p onClick={() => navigate("/pharmacy")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Pharmacy
                        </p>

                    </>
                )}

                {role === "patient" && (
                    <>
                        <p
                            onClick={() => navigate("/profile")}
                            className="cursor-pointer hover:bg-blue-50 p-2 rounded" >
                            My Profile
                        </p>
                        <p onClick={() => navigate("/doctors")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Doctors
                        </p>

                        <p onClick={() => navigate("/myappointments")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            My Appointments
                        </p>

                        <p onClick={() => navigate("/bookappointment")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Book Appointment
                        </p>
                    </>
                )}

                {role === "staff" && (
                    <>
                        <p
                            onClick={() => navigate("/profile")}
                            className="cursor-pointer hover:bg-blue-50 p-2 rounded"
                        >
                            My Profile
                        </p>
                        <p onClick={() => navigate("/users")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Manage Users
                        </p>

                        <p onClick={() => navigate("/support")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Support
                        </p>

                        <p onClick={() => navigate("/records")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Records
                        </p>
                        <p onClick={() => navigate("/pharmacy")} className="cursor-pointer hover:bg-blue-50 p-2 rounded">
                            Pharmacy
                        </p>
                    </>
                )}

                {/* LOGOUT */}
                <button
                    onClick={() => {
                        localStorage.removeItem("role");
                        window.location.href = "/";
                    }}
                    className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>

            </div>

        </aside>
    );
}
export default Sidebar;