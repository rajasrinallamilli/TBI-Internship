function Card({ title, description, image }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition">

      <img
        src={image}
        alt={title}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold text-emerald-700 mb-3">
          {title}
        </h2>

        <p className="text-gray-600">
          {description}
        </p>

      </div>

    </div>
  );
}

export default Card;