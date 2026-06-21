import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white p-10">
        <h1 className="text-5xl font-bold text-emerald-700 mb-6">
          About Trishul Eco Homestays
        </h1>

        <p className="text-lg text-gray-700">
          Trishul Eco Homestays provides travelers with a sustainable and
          peaceful stay experience amidst nature. Our mission is to promote
          eco-tourism while supporting local communities.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default About;