import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
        🌿 Trishul Eco Homestays|Direct Booking
      </h1>

      <div className="flex gap-6 mt-3 md:mt-0">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/availability">Availability</Link>
        <Link to="/booking">Book Now</Link>
      </div>

      <div className="hidden md:block text-xl">
        👤
      </div>

    </nav>
  );
}

export default Navbar;