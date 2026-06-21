import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-black dark:to-gray-900 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
        🌿 Trishul Eco Homestays|Direct Booking
      </h1>

      <div className="flex gap-6 mt-3 md:mt-0">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/availability">Availability</Link>
        <Link to="/booking">Book Now</Link>
      </div>

      <div className="flex items-center gap-4">
  <ThemeToggle />
  <span className="text-xl">👤</span>
</div>

    </nav>
  );
}

export default Navbar;