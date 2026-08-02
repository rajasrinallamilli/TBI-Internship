import { Link } from "react-router-dom";
import { Button } from "./ui";

function Card({
  id,
  title,
  description,
  image,
  location,
  price,
}) {
  console.log("Card ID:", id);
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">

      <img
        src={image}
        alt={title}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold text-emerald-700 dark:text-yellow-300 mb-3">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          📍 {location}
        </p>

        <p className="mt-2 text-xl font-bold text-emerald-700 dark:text-emerald-400">
          ₹ {price} / Night
        </p>

        <div className="mt-6">

          <Link to={`/booking/${id}`}>

            <Button
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Book Now
            </Button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Card;