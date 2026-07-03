import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [homestays, setHomestays] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/homestays")
    .then((response) => {
      setHomestays(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  
  return (
    <>
      
     
      <Navbar />

      <Hero />

      <section className="py-12 px-6 bg-slate-50 dark:bg-black">
        <h2 className="text-4xl font-bold text-center text-emerald-700 dark:text-yellow-300 mb-6">
          About Our Homestay
        </h2>

       <p className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-300">
          Nestled in nature, Trishul Eco Homestays offers a peaceful getaway
          with breathtaking mountain views, eco-friendly accommodations, and
          authentic local experiences.
        </p>
      </section>

      <section className="py-12 px-6 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-black">
       <h2 className="text-4xl font-bold text-center text-emerald-700 dark:text-yellow-300 mb-10">
          Available Room Types
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {homestays.map((home) => (
    <Card
      key={home._id}
      title={home.title}
      description={home.description}
      image={home.image}
      location={home.location}
  price={home.price}
    />
  ))}
</div>
      </section>

      <Footer />
    </>
  );
}

export default Home;