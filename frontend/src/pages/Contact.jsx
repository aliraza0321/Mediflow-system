 function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10">

    
      <section className="text-center mb-14">

        <h1 className="text-4xl font-bold text-blue-700">
          Contact MediFlow Hospital
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We are available 24/7 for your support. Feel free to reach out for
          appointments, emergencies, or general inquiries.
        </p>

      </section>

   
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">

        <div className="bg-white p-6 shadow rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-blue-600">📍 Address</h3>
          <p className="text-gray-500 mt-2">
            City Care Hospital, Main Road, Pakistan
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-blue-600">📞 Phone</h3>
          <p className="text-gray-500 mt-2">
            +92 300 0000000
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl text-center hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h3 className="font-bold text-blue-600">📧 Email</h3>
          <p className="text-gray-500 mt-2">
            support@mediflow.com
          </p>
        </div>

      </section>

      
      <section className="flex justify-center mb-16">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl hover:shadow-2xl transition-all duration-300">

          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Send Us a Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
          />

          <textarea
            placeholder="Write your message..."
            className="w-full p-3 border rounded-lg h-32 mb-4 focus:outline-blue-400"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>

        </div>

      </section>

      <footer className="text-center text-gray-500 border-t pt-6">

        <p className="font-semibold text-gray-700">
          MediFlow Hospital System
        </p>

        <p className="mt-2">
          Created by <span className="font-bold text-blue-600">ARM Developers</span>
        </p>

        <p className="text-sm mt-2">
          © 2026 All Rights Reserved
        </p>

      </footer>

    </div>
  );
}
export default Contact;