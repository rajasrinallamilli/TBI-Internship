import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const AITripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  const [interest, setInterest] = useState("");

  const [tripPlan, setTripPlan] = useState("");
  const [loading, setLoading] = useState(false);

 const generateTrip = async () => {

  if (!destination || !days || !people || !interest) {

    toast.error("Please fill all the fields.");

    return;
  }

  try {

    setLoading(true);
    setTripPlan("");

    const res = await axios.post(
      `${API}/api/ai/tripplanner`,
      {
        destination,
        days,
        people,
        interest,
      }
    );

    setTripPlan(res.data.tripPlan);

    toast.success("Trip plan generated successfully!");

  } catch (err) {

    console.error(err);

    toast.error(
      "Unable to generate trip plan. Please try again."
    );

  } finally {

    setLoading(false);

  }

};
return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-12 px-6">

    <div className="max-w-5xl mx-auto">

      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-green-700">
          🌿 AI Trip Planner
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Plan your perfect vacation with AI for Trishul EcoHomestays
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-3xl p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="📍 Destination"
            value={destination}
            onChange={(e)=>setDestination(e.target.value)}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="number"
            placeholder="📅 Number of Days"
            value={days}
            onChange={(e)=>setDays(e.target.value)}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="text"
            placeholder="👨 Traveller Type"
            value={people}
            onChange={(e)=>setPeople(e.target.value)}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <input
            type="text"
            placeholder="❤️ Interests"
            value={interest}
            onChange={(e)=>setInterest(e.target.value)}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

        </div>

       <button
  onClick={generateTrip}
  disabled={loading}
  className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
>
  {loading ? "Generating..." : "✨ Generate My AI Trip"}
</button>
<button
  onClick={() => {

    setDestination("");
    setDays("");
    setPeople("");
    setInterest("");
    setTripPlan("");

  }}
  className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 rounded-xl"
>
  Clear
</button>

      </div>

      {loading && (

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 text-center">

          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-green-600 mx-auto"></div>

          <p className="mt-6 text-lg font-semibold text-green-700">
            AI is planning your dream vacation...
          </p>

        </div>

      )}
      {
!loading && !tripPlan && (

<div className="mt-10 bg-white rounded-3xl shadow-lg p-8 text-center">

<h2 className="text-2xl font-bold text-green-700">

🌿 Ready to Plan?

</h2>

<p className="mt-3 text-gray-600">

Enter your trip details above and click
Generate My AI Trip.

</p>

</div>

)
}

      {tripPlan && (

        <div className="mt-10 bg-white shadow-xl rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            🧳 Your Personalized Trip Plan
          </h2>

          <pre className="whitespace-pre-wrap text-gray-700 leading-8 font-sans">
            {tripPlan}
          </pre>

        </div>

      )}

    </div>

  </div>
);
  
};

export default AITripPlanner;