import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-[75vh] bg-gradient-to-b from-emerald-50 via-white to-stone-50 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900 flex items-center justify-center px-4 text-center">
        <div className="max-w-md p-8 bg-white dark:bg-stone-900 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-850">
          <span className="text-6xl animate-pulse inline-block mb-4">🍃</span>
          
          <h1 className="text-5xl font-extrabold text-emerald-800 dark:text-emerald-450 leading-tight">
            404
          </h1>
          
          <h2 className="text-xl font-extrabold text-stone-800 dark:text-stone-200 mt-4">
            Lost in the Forest?
          </h2>
          
          <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm leading-relaxed">
            The page you are looking for has either been moved, deleted, or never existed in our valley.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-2xl cursor-pointer transition shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Return to Safe Shelter
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
