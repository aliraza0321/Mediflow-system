import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function RateDoctor() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const doctor = state?.doctor || state?.doctorName;
  const doctorId = state?.doctorId;
  const appointmentId = state?.appointmentId;

  const submitRating = async () => {
    if (!doctorId || !appointmentId) {
      alert("Please open this page from My Appointments.");
      return;
    }

    if (rating < 1) {
      alert("Please select a rating.");
      return;
    }

    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/rate-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId,
          appointmentId,
          rating,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        alert(data.message || "Unable to submit rating");
        return;
      }

      alert("Rating submitted successfully");

      navigate("/myappointments");
    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Rate {doctor}
      </h1>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <button
        onClick={submitRating}
        disabled={isSaving}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {isSaving ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
}

export default RateDoctor;
