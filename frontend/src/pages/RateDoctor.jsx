 import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function RateDoctor() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  const doctor = state?.doctor;
  const doctorId = state?.doctorId;
  const appointmentId = state?.appointmentId;

  const submitRating = async () => {

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

      alert("Rating submitted successfully");

      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Error submitting rating");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Rate {doctor}
      </h1>

      <div className="flex gap-2 mb-4">
        {[1,2,3,4,5].map((star) => (
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
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Submit Rating
      </button>
    </div>
  );
}

export default RateDoctor;