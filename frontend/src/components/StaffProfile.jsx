 function StaffProfile({ data }) {
  return (
    <div className="space-y-2">
      <p><strong>Department:</strong> {data.department}</p>
      <p><strong>Shift:</strong> {data.shift}</p>
    </div>
  );
}
export default StaffProfile;