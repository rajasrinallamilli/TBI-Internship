import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function HomestayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [homestay, setHomestay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [shareText, setShareText] = useState("Share Property");

  // New Review Form States
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/homestays/${id}`);
        setHomestay(res.data);
        setActiveImage(res.data.image);
      } catch (error) {
        console.error("Fetch homestay detail error:", error);
        toast.error("Unable to load homestay details.");
        navigate("/homestays");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
    setShareText("Link Copied!");
    setTimeout(() => {
      setShareText("Share Property");
    }, 2000);
  };

  const handleBookNow = () => {
    if (!token) {
      toast.error("Please login to request a booking inquiry.");
      navigate(`/login?redirect=/booking&room=${encodeURIComponent(homestay.title)}`);
      return;
    }
    navigate(`/booking?room=${encodeURIComponent(homestay.title)}`);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to submit a review.");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    try {
      setSubmittingReview(true);
      const userObj = JSON.parse(localStorage.getItem("user") || "{}");
      const reviewPayload = {
        user: userObj.name || "Eco-Traveler",
        rating: newRating,
        comment: newComment,
      };

      // In the backend, we can support adding reviews inside the update route
      // or implement a dedicated review endpoint. Let's add it to update route!
      const updatedReviews = [...(homestay.reviews || []), reviewPayload];
      const updatedRating = Number(
        (
          (homestay.reviews?.reduce((acc, r) => acc + r.rating, 0) + newRating) /
          (updatedReviews.length)
        ).toFixed(1)
      );

      const res = await api.put(`/homestays/${id}`, {
        reviews: updatedReviews,
        rating: updatedRating,
        reviewsCount: updatedReviews.length,
      });

      setHomestay(res.data);
      setNewComment("");
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Add review error:", error);
      toast.error("Unable to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!homestay) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dark:text-stone-100 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={() => navigate("/homestays")}
            className="flex items-center gap-2 text-stone-500 hover:text-emerald-700 dark:hover:text-emerald-450 font-bold mb-6 cursor-pointer text-sm"
          >
            ← Back to Homestays
          </button>

          {/* Title & Share */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 rounded-full uppercase">
                  {homestay.roomType}
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  ★ {homestay.rating} ({homestay.reviewsCount} reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-stone-850 dark:text-white mt-2">
                {homestay.title}
              </h1>
              <p className="text-stone-500 dark:text-stone-400 mt-1">📍 {homestay.location}</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 border-2 border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs px-5 py-3 rounded-2xl cursor-pointer transition shadow-sm"
              >
                Share Stay
              </button>
              <button
                onClick={handleBookNow}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3.5 rounded-2xl cursor-pointer transition shadow-md hover:shadow-lg"
              >
                Inquire & Book Now
              </button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Gallery & Content (Col-span 2) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Photo Gallery Card */}
              <div className="space-y-4">
                <div className="h-96 md:h-[450px] w-full rounded-3xl overflow-hidden shadow-md">
                  <img
                    src={activeImage}
                    alt={homestay.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnails Row */}
                {homestay.images && homestay.images.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto py-2">
                    {homestay.images.map((imgUrl, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`w-24 h-16 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 transition duration-300 border-2 ${
                          activeImage === imgUrl ? "border-emerald-600 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`View detail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-sm border border-stone-150 dark:border-stone-850 space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold mb-3">About this eco-stay</h2>
                  <p className="text-stone-605 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {homestay.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-150 dark:border-stone-800">
                  <div className="text-center sm:text-left">
                    <span className="text-stone-400 block text-xs font-bold uppercase">Max Occupancy</span>
                    <span className="font-extrabold text-stone-850 dark:text-stone-100 text-sm mt-1 block">
                      {homestay.maxGuests} Guests
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-stone-400 block text-xs font-bold uppercase">Room Category</span>
                    <span className="font-extrabold text-stone-850 dark:text-stone-100 text-sm mt-1 block">
                      {homestay.roomType}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-stone-400 block text-xs font-bold uppercase">Waste Policy</span>
                    <span className="font-extrabold text-stone-850 dark:text-stone-100 text-sm mt-1 block text-emerald-650 dark:text-emerald-400">
                      Zero Single-Use Plastic
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-stone-400 block text-xs font-bold uppercase">Support Rate</span>
                    <span className="font-extrabold text-stone-850 dark:text-stone-100 text-sm mt-1 block text-emerald-650 dark:text-emerald-400">
                      100% Direct to Village
                    </span>
                  </div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-sm border border-stone-150 dark:border-stone-850">
                <h2 className="text-xl font-extrabold mb-5">Eco-Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {homestay.amenities?.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-100 dark:border-stone-800 text-stone-750 dark:text-stone-300 text-sm font-semibold"
                    >
                      <span className="text-emerald-600">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-sm border border-stone-150 dark:border-stone-850 space-y-6">
                <h2 className="text-xl font-extrabold mb-2">Guest Reviews</h2>
                
                {(!homestay.reviews || homestay.reviews.length === 0) ? (
                  <p className="text-stone-500 text-sm py-4">No guest reviews yet. Be the first to share your experience!</p>
                ) : (
                  <div className="space-y-6 divide-y divide-stone-150 dark:divide-stone-800">
                    {homestay.reviews.map((rev, index) => (
                      <div key={index} className={`pt-6 ${index === 0 ? "pt-0" : ""}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-stone-800 dark:text-stone-150 text-sm">{rev.user}</span>
                            <span className="text-xs text-stone-400 block mt-0.5">
                              {new Date(rev.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-amber-500">
                            {"★".repeat(rev.rating)}
                          </span>
                        </div>
                        <p className="text-stone-605 dark:text-stone-300 mt-2 text-sm leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Leave a review form */}
                {token ? (
                  <form onSubmit={handleAddReview} className="border-t border-stone-150 dark:border-stone-800 pt-6 mt-8 space-y-4">
                    <h3 className="font-bold text-base">Write a Review</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-stone-500">Rating:</span>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-3 py-1.5 text-sm"
                      >
                        {[5, 4, 3, 2, 1].map((val) => (
                          <option key={val} value={val}>{val} Stars</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <textarea
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your stay experience..."
                        className="w-full rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 p-3 text-sm focus:border-emerald-600 outline-none transition"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                ) : (
                  <p className="text-stone-400 text-xs mt-4">
                    Please <span className="text-emerald-600 font-bold hover:underline cursor-pointer" onClick={() => navigate("/login")}>login</span> to write a review.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar Booking Inquiry & Locations (Col-span 1) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Cost Card */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-md border border-stone-150 dark:border-stone-850 space-y-6 text-center lg:text-left">
                <div>
                  <span className="text-stone-400 dark:text-stone-500 text-xs block font-bold uppercase">Direct Inquiry Price</span>
                  <span className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-450 mt-1 block">
                    {homestay.price} <span className="text-lg text-stone-500">INR / night</span>
                  </span>
                  <span className="text-stone-400 dark:text-stone-500 text-[10px] block mt-1">
                    No OTA commission. Taxes and local breakfast included.
                  </span>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-2xl cursor-pointer transition shadow-md hover:shadow-lg"
                >
                  Send Booking Inquiry
                </button>
              </div>

              {/* Nearby Places */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-sm border border-stone-150 dark:border-stone-850">
                <h3 className="font-extrabold text-base mb-4">Location & Distances</h3>
                <div className="space-y-3">
                  {homestay.nearbyPlaces?.map((place, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-stone-100 dark:border-stone-805 pb-2 last:border-0 last:pb-0">
                      <span className="text-stone-600 dark:text-stone-300 font-semibold">{place.name}</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-sm border border-stone-150 dark:border-stone-850">
                <div className="p-5 border-b border-stone-150 dark:border-stone-800">
                  <h3 className="font-extrabold text-base">Interactive map</h3>
                </div>
                <div className="h-64 bg-stone-100 dark:bg-stone-850 relative flex items-center justify-center overflow-hidden">
                  {/* Simulated map graphic */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
                  
                  {/* Stylized local pin */}
                  <div className="relative z-10 text-center p-6 space-y-3">
                    <span className="text-4xl animate-bounce inline-block">📍</span>
                    <h4 className="font-bold text-xs">{homestay.location}</h4>
                    <a
                      href={homestay.googleMapsUrl || "https://maps.google.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3.5 py-2 rounded-xl transition shadow cursor-pointer"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomestayDetail;
