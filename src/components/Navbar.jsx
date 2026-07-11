import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navigate = useNavigate();

  // Check whether the user is logged in
  const token = localStorage.getItem("token");

  // Get logged-in user details
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  // Logout function
  const handleLogout = () => {
    // Remove JWT token and user details
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");

    // Refresh to update Navbar immediately
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 text-white shadow-lg dark:from-black dark:to-gray-900">

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

        {/* Website title */}
        <Link
          to="/"
          className="text-center text-2xl font-bold"
        >
          🌿 Trishul Eco Homestays | Direct Booking
        </Link>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-5">

          <Link
            to="/"
            className="transition hover:text-green-200"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="transition hover:text-green-200"
          >
            About
          </Link>

          <Link
            to="/availability"
            className="transition hover:text-green-200"
          >
            Availability
          </Link>

          {/* Show Booking only after login */}
          {token && (
            <Link
              to="/booking"
              className="transition hover:text-green-200"
            >
              Book Now
            </Link>
          )}

          {/* User is not logged in */}
          {!token && (
            <>
              <Link
                to="/login"
                className="transition hover:text-green-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-white px-4 py-2 font-semibold text-emerald-700 transition hover:bg-green-100"
              >
                Register
              </Link>
            </>
          )}

          {/* User is logged in */}
          {token && (
            <>
              <Link
                to="/profile"
                className="transition hover:text-green-200"
              >
                👤 {user?.name || "Profile"}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Theme toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>

      </div>

    </nav>
  );
}

export default Navbar;