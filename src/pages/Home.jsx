import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="py-12 px-6 bg-slate-50">
        <h2 className="text-4xl font-bold text-center text-emerald-700 mb-6">
          About Our Homestay
        </h2>

        <p className="max-w-4xl mx-auto text-center text-gray-600">
          Nestled in nature, Trishul Eco Homestays offers a peaceful getaway
          with breathtaking mountain views, eco-friendly accommodations, and
          authentic local experiences.
        </p>
      </section>

      <section className="py-12 px-6 bg-gradient-to-b from-white to-emerald-50">
        <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">
          Available Room Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Mountain View Cottage"
            description="Private cottage overlooking scenic hills."
            image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          />

          <Card
            title="Forest Retreat"
            description="Stay surrounded by greenery and fresh air."
            image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          />

          <Card
            title="Family Eco Villa"
            description="Spacious villa ideal for families."
            image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;