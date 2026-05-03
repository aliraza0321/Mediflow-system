 import { Link } from "react-router-dom";

 function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        MediFlow System
      </h1>

      <div className="flex gap-6 text-gray-700 font-medium">

        <Link to="/home" className="hover:text-blue-500 hover:bg-gray-400 px-3 py-2 rounded-lg">
          Home
        </Link>

        <Link to="/about" className="hover:text-blue-500 hover:bg-gray-400 px-3 py-2 rounded-lg">
          About
        </Link>

        <Link to="/contact" className="hover:text-blue-500 hover:bg-gray-400 px-3 py-2 rounded-lg">
          Contact
        </Link>

      </div>

    </nav>
  );
}
export default Navbar;