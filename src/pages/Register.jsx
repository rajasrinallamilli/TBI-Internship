import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Register user
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Frontend validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
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
            "Registration failed."
        );
        return;
      }

      setMessage(
        "Registration successful! Redirecting to login..."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login after registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
        
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Join Trishul EcoHomestays
          </p>
        </div>

        {/* Success message */}
        {message && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-100 p-3 text-center text-green-700">
            {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-100 p-3 text-center text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* Full name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

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
          <div className="mb-4">
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
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Confirm password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:underline dark:text-green-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;