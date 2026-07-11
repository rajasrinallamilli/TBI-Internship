import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get JWT token from URL
    const token = searchParams.get("token");

    // If token is available, save it
    if (token) {
      localStorage.setItem("token", token);

      // Go to protected profile page
      navigate("/profile", {
        replace: true,
      });
    } else {
      // If token is missing, return to login
      navigate(
        "/login?error=google-login-failed",
        {
          replace: true,
        }
      );
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 dark:bg-gray-900">
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">

        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
          Google Login Successful
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Please wait while we open your account...
        </p>

      </div>
    </div>
  );
}

export default OAuthSuccess;