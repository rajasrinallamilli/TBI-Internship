import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-white">

        {/* Hero */}
        <section className="bg-emerald-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">
              About Trishul Eco Homestays
            </h1>

            <p className="text-lg max-w-3xl mx-auto">
              Experience peaceful living surrounded by nature while supporting
              sustainable tourism through our direct booking platform.
            </p>
          </div>
        </section>

        {/* About */}
        <section className="max-w-6xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="Eco Homestay"
              className="rounded-2xl shadow-xl h-[420px] w-full object-cover"
            />

            <div>

              <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-5">
                Welcome to Trishul Eco Homestays
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-8">
                Trishul Eco Homestays offers travelers a peaceful and
                eco-friendly accommodation experience surrounded by beautiful
                natural landscapes. Our mission is to provide comfortable stays
                while encouraging responsible tourism and preserving the local
                environment.
              </p>

              <p className="mt-5 text-gray-600 dark:text-gray-300 leading-8">
                Through our Direct Booking Engine, guests can contact us
                directly without relying on third-party booking platforms,
                helping both visitors and the homestay avoid unnecessary
                commission charges.
              </p>

            </div>

          </div>

        </section>

        {/* Mission & Vision */}

        <section className="bg-white dark:bg-gray-800 py-16">

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

            <div className="rounded-xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-emerald-700 mb-4">
                🌿 Our Mission
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-7">
                To promote eco-friendly tourism by providing affordable,
                comfortable, and direct accommodation booking without third-party
                commissions.
              </p>

            </div>

            <div className="rounded-xl shadow-lg p-8">

              <h2 className="text-2xl font-bold text-emerald-700 mb-4">
                🌍 Our Vision
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-7">
                To become a trusted eco-tourism destination where travelers
                enjoy nature, comfort, and authentic hospitality while
                supporting local communities.
              </p>

            </div>

          </div>

        </section>

        {/* Features */}

        <section className="max-w-6xl mx-auto px-6 py-16">

          <h2 className="text-4xl font-bold text-center text-emerald-700 mb-12">
            Why Choose Trishul Eco Homestays?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">🏡</div>

              <h3 className="text-xl font-bold mb-3">
                Comfortable Stay
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Clean rooms with a peaceful atmosphere and modern amenities.
              </p>

            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">🌳</div>

              <h3 className="text-xl font-bold mb-3">
                Nature Experience
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Relax in beautiful natural surroundings and enjoy eco-friendly
                living.
              </p>

            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">

              <div className="text-5xl mb-4">💰</div>

              <h3 className="text-xl font-bold mb-3">
                Zero Commission Booking
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                Book directly with us without paying extra OTA commission fees.
              </p>

            </div>

          </div>

        </section>

        {/* Direct Booking */}

        <section className="bg-emerald-700 text-white py-16">

          <div className="max-w-5xl mx-auto text-center px-6">

            <h2 className="text-4xl font-bold mb-5">
              Book Directly With Us
            </h2>

            <p className="text-lg mb-8">
              Our Direct Booking Engine allows guests to send booking inquiries
              without any third-party commission, making the booking process
              simple, transparent, and convenient.
            </p>

            <Link
              to="/booking"
              className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Book Your Stay
            </Link>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default About;