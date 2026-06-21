import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader } from "../components/ui";

function Availability() {
  const [loading, setLoading] = useState(true);

  const availableDates = [
    "20 June - 25 June",
    "1 July - 10 July",
    "18 July - 25 July",
    "1 August - 15 August",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-sky-50 dark:bg-gray-900 dark:text-white p-10">
        <h1 className="text-5xl font-bold text-emerald-700 mb-8">
          Availability Calendar
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Available Dates
          </h2>

          <ul className="space-y-3">
            {availableDates.map((date, index) => (
              <li
                key={index}
                className="bg-emerald-100 p-3 rounded-lg"
              >
                {date}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Availability;

