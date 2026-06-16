import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Booking() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 p-10">
        <h1 className="text-5xl font-bold text-center text-emerald-700 mb-10">
          Booking Inquiry
        </h1>

        <form className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

          <div className="mb-4">
            <label className="block mb-2">Check-In Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Check-Out Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Guests</label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Room Preference</label>
            <select className="w-full border rounded-lg p-3">
              <option>Mountain View Cottage</option>
              <option>Forest Retreat</option>
              <option>Family Eco Villa</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 py-4 rounded-xl font-bold"
          >
            Send Booking Inquiry
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Booking;