function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/doctor/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Appointments:", data);

      // ⚠️ adjust based on backend response
      setAppointments(data.appointments || data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>

      <div className="grid gap-4">
        {appointments.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
            <p><strong>Patient:</strong> {a.patient}</p>
            <p><strong>Time:</strong> {a.time}</p>
            <p><strong>Status:</strong> {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Appointments;