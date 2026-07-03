import { Button } from "./ui";
function Card({ title, description, image ,location, price}) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition">
      <img
        src={image}
        alt={title}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

       <h2 className="text-2xl font-bold text-emerald-700 dark:text-yellow-300 mb-3">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
  📍 {location}
</p>

<p className="font-bold text-emerald-700 mt-1">
  ₹ {price} / Night
</p>

      </div>
      <div className="mt-5">
  <Button variant="secondary">
    Book Now
  </Button>
</div>

    </div>
  );
}

export default Card;