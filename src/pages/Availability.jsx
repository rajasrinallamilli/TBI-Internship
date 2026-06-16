import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Availability() {
  const availableDates = [
    "20 June - 25 June",
    "1 July - 10 July",
    "18 July - 25 July",
    "1 August - 15 August",
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-sky-50 p-10">
        <h1 className="text-5xl font-bold text-emerald-700 mb-8">
          Availability Calendar
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
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

