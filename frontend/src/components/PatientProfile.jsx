 function PatientProfile({ data }) {
  return (
    <div className="space-y-2">
      <p><strong>Age:</strong> {data.age}</p>
      <p><strong>Blood Group:</strong> {data.blood}</p>
    </div>
  );
}
export default PatientProfile;