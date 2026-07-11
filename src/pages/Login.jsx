import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update input values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login user
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Frontend validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            data.errors?.[0]?.msg ||
            "Login failed. Please try again."
        );
        return;
      }

      // Save JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Save logged-in user details
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  // Open Google OAuth login
const handleGoogleLogin = () => {
  window.location.href =
    "http://localhost:5000/api/auth/google";
};

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Login to Trishul EcoHomestays
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-100 p-3 text-center text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Divider */}
<div className="my-6 flex items-center">
  <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>

  <span className="px-4 text-sm text-gray-500 dark:text-gray-300">
    OR
  </span>

  <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
</div>

{/* Google Login Button */}
<button
  type="button"
  onClick={handleGoogleLogin}
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
>
  <span className="text-xl font-bold">
    G
  </span>

  Continue with Google
</button>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-green-700 hover:underline dark:text-green-400"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;