import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Homestays() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [homestays, setHomestays] = useState([]);
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [roomType, setRoomType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating-desc");

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        setLoading(true);
        const res = await api.get("/homestays");
        setHomestays(res.data);
      } catch (error) {
        console.error("Fetch homestays error:", error);
        toast.error("Failed to load eco-homestays list.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...homestays];

    // Search query filter (matches title or location)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q)
      );
    }

    // Room type filter
    if (roomType !== "All") {
      result = result.filter((h) => h.roomType === roomType);
    }

    // Price filter
    result = result.filter((h) => h.price <= maxPrice);

    // Rating filter
    if (minRating > 0) {
      result = result.filter((h) => h.rating >= minRating);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredHomestays(result);
  }, [homestays, searchQuery, roomType, maxPrice, minRating, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setRoomType("All");
    setMaxPrice(6000);
    setMinRating(0);
    setSortBy("rating-desc");
  };

  return (
    <>
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-emerald-800 dark:bg-stone-900 text-white py-16 px-6 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-emerald-300 dark:text-emerald-450 font-bold uppercase tracking-widest text-xs">Direct Booking Catalog</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 leading-tight">
            Discover Our Sustainable EcoHomestays
          </h1>
          <p className="text-emerald-100 dark:text-stone-300 mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Book certified zero-plastic, organic stays directly from local host villages. Bypassing commission engines supports ecological conservation.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dark:text-stone-100 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="md:col-span-1 bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-md border border-stone-150 dark:border-stone-850 h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-stone-150 dark:border-stone-805 pb-4">
              <h2 className="font-extrabold text-lg flex items-center gap-2">
                <span>Filters</span>
              </h2>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-450 hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 dark:text-stone-500 mb-2">Search Destination</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Rishikesh, Auli"
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition"
              />
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 dark:text-stone-500 mb-2">Accomodation Type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition"
              >
                <option value="All">All Types</option>
                <option value="Cottage">Cottage</option>
                <option value="Suite">Suite</option>
                <option value="Room">Standard Room</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase text-stone-400 dark:text-stone-500 mb-2">
                <span>Max Price / Night</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{maxPrice} INR</span>
              </div>
              <input
                type="range"
                min="2000"
                max="6000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Min Rating */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 dark:text-stone-500 mb-2">Minimum Rating</label>
              <div className="flex gap-2">
                {[0, 3, 4, 4.5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      minRating === stars
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "border-stone-250 dark:border-stone-750 hover:bg-stone-100 dark:hover:bg-stone-800"
                    }`}
                  >
                    {stars === 0 ? "Any" : `${stars}★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 dark:text-stone-500 mb-2">Sort Results By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 dark:focus:border-emerald-500 transition"
              >
                <option value="rating-desc">Rating: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Catalog Listing */}
          <div className="md:col-span-3">
            {loading ? (
              /* Skeleton Loader */
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-150 dark:border-stone-850 animate-pulse h-96">
                    <div className="h-48 bg-stone-200 dark:bg-stone-800 w-full"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3"></div>
                      <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4"></div>
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2"></div>
                      <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded w-full pt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredHomestays.length === 0 ? (
              /* Empty State */
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-150 dark:border-stone-850">
                <span className="text-5xl">🌲</span>
                <h3 className="text-xl font-bold mt-4">No Eco-Homestays Found</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-2 max-w-sm mx-auto">
                  We couldn't find any rooms matching your selected filters. Try widening your price ranges or changing accommodation parameters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl transition duration-305 cursor-pointer shadow"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* Room Cards Grid */
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHomestays.map((home) => (
                  <div
                    key={home._id}
                    className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-150 dark:border-stone-850 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
                  >
                    {/* Header Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={home.image}
                        alt={home.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-emerald-700/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">
                        {home.roomType}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-stone-400 dark:text-stone-500">
                          📍 {home.location}
                        </span>
                        <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                          ★ {home.rating}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-lg text-stone-800 dark:text-white mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {home.title}
                      </h3>

                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                        {home.description}
                      </p>

                      {/* Amenities Icons Preview */}
                      <div className="flex flex-wrap gap-1 mt-4">
                        {home.amenities?.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md"
                          >
                            {amenity}
                          </span>
                        ))}
                        {home.amenities?.length > 3 && (
                          <span className="text-[10px] text-stone-400 font-bold px-1.5 self-center">
                            +{home.amenities.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Footer & CTA */}
                      <div className="border-t border-stone-150 dark:border-stone-805 pt-4 mt-5 flex items-center justify-between">
                        <div>
                          <span className="text-stone-400 dark:text-stone-500 text-[10px] block font-bold uppercase">Price/Night</span>
                          <span className="text-lg font-extrabold text-emerald-800 dark:text-emerald-450">
                            {home.price} <span className="text-xs text-stone-500">INR</span>
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/homestays/${home._id}`)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl cursor-pointer transition shadow-sm hover:shadow active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homestays;
