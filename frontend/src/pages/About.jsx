 function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10">

      <section className="text-center mb-16">

        <h1 className="text-4xl font-bold text-blue-700">
          About MediFlow Hospital
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          MediFlow Hospital is a modern healthcare management system designed to
          connect doctors, patients, and staff in a seamless digital environment.
          Our mission is to improve healthcare delivery through technology.
        </p>

      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">

        <div className="bg-white p-8 shadow rounded-xl hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To provide efficient, accessible, and reliable healthcare services
            through a smart hospital management system that improves patient care.
          </p>
        </div>

        <div className="bg-white p-8 shadow rounded-xl hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To become a leading digital healthcare platform that transforms
            traditional hospital systems into smart and automated solutions.
          </p>
        </div>

      </section>

      <section className="mb-16 text-center">

        <h2 className="text-2xl font-bold mb-8">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-white p-6 shadow rounded-xl hover:scale-105 transition">
            <h3 className="font-bold text-blue-600">Smart System</h3>
            <p className="text-gray-500 mt-2">
              Digital hospital management with modern UI
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl hover:scale-105 transition">
            <h3 className="font-bold text-blue-600">Fast Performance</h3>
            <p className="text-gray-500 mt-2">
              Quick access to doctors and patient records
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl hover:scale-105 transition">
            <h3 className="font-bold text-blue-600">Secure Data</h3>
            <p className="text-gray-500 mt-2">
              Safe and protected medical information
            </p>
          </div>

        </div>

      </section>

      <section className="bg-white shadow rounded-xl p-10 max-w-5xl mx-auto grid md:grid-cols-3 text-center">

        <div>
          <h2 className="text-3xl font-bold text-blue-600">500+</h2>
          <p className="text-gray-500">Doctors</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
          <p className="text-gray-500">Patients</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
          <p className="text-gray-500">Support</p>
        </div>

      </section>

      <div className="text-center mt-16 text-gray-500">
        © 2026 MediFlow System - All Rights Reserved
      </div>

    </div>
  );
}
export default About;