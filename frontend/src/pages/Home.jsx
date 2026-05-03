  function Home() {
  return (
    <>

      <section className="text-center mb-14">

        <h1 className="text-4xl font-bold text-blue-700">
          Welcome to MediFlow System
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          A modern healthcare platform connecting doctors, patients, and staff
          for efficient hospital operations and better patient care.
        </p>

      </section>

      <section className="mb-14 flex flex-col items-center">

        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 shadow rounded-xl hover:scale-105 hover:shadow-xl transition">
            <h3 className="font-bold">Doctor Consultation</h3>
            <p className="text-sm text-gray-500">
              Online & offline medical consultations
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl hover:scale-105 hover:shadow-xl transition">
            <h3 className="font-bold">Emergency Care</h3>
            <p className="text-sm text-gray-500">
              24/7 emergency medical support
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl hover:scale-105 hover:shadow-xl transition">
            <h3 className="font-bold">Pharmacy System</h3>
            <p className="text-sm text-gray-500">
              Manage medicine stock and availability
            </p>
          </div>

        </div>

      </section>

      <section className="mb-16 flex flex-col items-center">

        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Feedback
        </h2>

        <div className="bg-white shadow rounded-xl p-6 max-w-xl hover:scale-105 hover:shadow-xl transition">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg mb-3"
          />

          <textarea
            placeholder="Write your feedback..."
            className="w-full p-3 border rounded-lg h-28 mb-3"
          />

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Submit Feedback
          </button>

        </div>

      </section>

      <footer className="text-center border-t pt-6 text-gray-500">

        <p className="font-semibold text-gray-700">
          MediFlow System - Your Health, Our Priority
        </p>

        <p className="mt-2">
          Created by <span className="font-bold text-blue-600">ARM Developers</span>
        </p>

        <p className="text-sm mt-2">
          © 2026 All Rights Reserved
        </p>

      </footer>

    </>
  );
}
export default Home;