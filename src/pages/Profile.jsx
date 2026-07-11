import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get JWT token from localStorage
        const token = localStorage.getItem("token");

        // If token is not available, redirect to login
        if (!token) {
          navigate("/login");
          return;
        }

        // Send token to protected backend API
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // Token is invalid or expired
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        // Other backend errors
        if (!response.ok) {
          setError(
            data.message || "Unable to load profile details."
          );
          return;
        }

        // Store user details received from backend
        setUser(data.user);
      } catch (error) {
        console.error("Profile error:", error);

        setError(
          "Unable to connect to the server. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50 dark:bg-gray-900">
        <p className="text-lg font-medium text-green-700 dark:text-green-400">
          Loading your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10 dark:bg-gray-900">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">

        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            My Profile
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Trishul EcoHomestays Account
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-100 p-3 text-center text-red-700">
            {error}
          </div>
        )}

        {/* User details */}
        {user && (
          <div className="space-y-4">

            <div className="rounded-xl bg-green-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Full Name
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white">
                {user.name}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Email Address
              </p>

              <p className="mt-1 break-all text-lg font-semibold text-gray-800 dark:text-white">
                {user.email}
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4 dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Member Since
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-800 dark:text-white">
                {user.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-7 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;