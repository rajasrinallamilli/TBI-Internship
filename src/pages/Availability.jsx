import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API = import.meta.env.VITE_API_URL;

function Availability() {
  const [homestays, setHomestays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomestays();
  }, []);

  const fetchHomestays = async () => {
    try {
      const res = await axios.get(`${API}/api/homestays`);
      setHomestays(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white">

        {/* Hero */}

        <section className="bg-emerald-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Check Availability
            </h1>

            <p className="text-lg">
              Browse our eco homestays and reserve your perfect stay.
            </p>
          </div>
        </section>

        {/* Search Section (UI Only) */}

        <section className="max-w-7xl mx-auto px-6 py-10">

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 grid md:grid-cols-4 gap-4">

            <input
              type="date"
              className="border rounded-lg p-3 dark:bg-gray-700"
            />

            <input
              type="date"
              className="border rounded-lg p-3 dark:bg-gray-700"
            />

            <select
              className="border rounded-lg p-3 dark:bg-gray-700"
            >
              <option>Guests</option>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
            </select>

            <button className="bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              Search
            </button>

          </div>

        </section>

        {/* Homestays */}

        <section className="max-w-7xl mx-auto px-6 pb-16">

          {loading ? (
            <div className="text-center text-xl">
              Loading Homestays...
            </div>
          ) : (

            <div className="grid md:grid-cols-3 gap-8">

              {homestays.map((stay) => (

                <div
                  key={stay._id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >

                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold mb-2">
                      {stay.title}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-300 mb-2">
                      📍 {stay.location}
                    </p>

                    <div className="flex justify-between mb-3">

                      <span className="font-semibold text-emerald-600">
                        ₹{stay.price}/Night
                      </span>

                      <span>
                        ⭐ {stay.rating}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-5">

                      <span>
                        🛏 {stay.roomType}
                      </span>

                      <span>
                        👥 {stay.maxGuests} Guests
                      </span>

                    </div>

                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-5">
                      Available
                    </span>

                    <div className="flex gap-3">

                      <Link
  to={`/booking/${stay._id}`}
  className="flex-1 bg-emerald-600 text-white text-center py-2 rounded-lg hover:bg-emerald-700"
>
  Book Now
</Link>

                      <Link
                        to={`/homestays/${stay._id}`}
                        className="flex-1 border border-emerald-600 text-emerald-600 text-center py-2 rounded-lg hover:bg-emerald-50"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Availability;
