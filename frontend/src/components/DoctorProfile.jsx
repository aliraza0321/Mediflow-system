 function DoctorProfile({ data }) {
  return (
    <div className="space-y-2">
      <p><strong>Specialization:</strong> {data.specialization}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      <p><strong>Timing:</strong> {data.timing}</p>
      <p><strong>Total Patients:</strong> {data.patients}</p>
    </div>
  );
}
export default DoctorProfile;