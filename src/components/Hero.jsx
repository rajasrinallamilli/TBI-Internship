import { Button } from "./ui";
import { Link } from "react-router-dom";
function Hero() {
  return (
    
<section className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 dark:from-slate-950 dark:via-gray-900 dark:to-black text-white text-center py-24 px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Escape Into Nature
      </h1>

      <p className="text-xl mb-8">
        Direct bookings. Zero commission. Pure mountain experience.
      </p>
     <div className="flex gap-4 justify-center mt-6">

  <Link to="/booking">
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
      Book Now
    </button>
  </Link>

  <Link to="/ai-trip-planner">
    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
      🤖 AI Trip Planner
    </button>
  </Link>

</div>

    </section>
  );
}

export default Hero;