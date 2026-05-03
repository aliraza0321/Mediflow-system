import { Navigate, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar role={role} />
        <main className="flex-1 p-6">
          <Outlet context={{ role }} />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
