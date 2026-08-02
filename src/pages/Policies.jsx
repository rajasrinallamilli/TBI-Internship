import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dark:text-stone-100 py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-8 md:p-12 shadow-sm border border-stone-150 dark:border-stone-850">
          <span className="text-emerald-700 dark:text-emerald-450 font-bold uppercase tracking-widest text-xs">Legal Details</span>
          <h1 className="text-3xl font-extrabold text-stone-850 dark:text-white mt-2 mb-6">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
            <p>
              Last Updated: August 2026.
            </p>
            
            <p>
              At Trishul EcoHomestays, we respect your privacy and are committed to protecting the personal details you share with us. This policy describes how we collect, store, and utilize your information when you book stays directly on our platform.
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              1. Information We Collect
            </h3>
            <p>
              We collect details you submit when making a booking inquiry or account registration, including your name, email, phone number, and stay dates. In addition, we collect profile details when you sign in via Google OAuth.
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              2. How We Use Information
            </h3>
            <p>
              We utilize this information to facilitate booking inquiries, coordinate with local host villages, and display booking summaries inside your dashboard. We do not sell or lease your details to third-party travel agencies.
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              3. Data Security
            </h3>
            <p>
              Your security is paramount to us. We store account passwords using secure cryptographic hashing algorithms and authorize API requests using industry-standard JSON Web Tokens (JWT).
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              4. Contact Us
            </h3>
            <p>
              If you have any questions regarding our privacy practices, please contact us at privacy@trishuleco.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function TermsConditions() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dark:text-stone-100 py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-900 rounded-3xl p-8 md:p-12 shadow-sm border border-stone-150 dark:border-stone-850">
          <span className="text-emerald-700 dark:text-emerald-450 font-bold uppercase tracking-widest text-xs">Agreement</span>
          <h1 className="text-3xl font-extrabold text-stone-850 dark:text-white mt-2 mb-6">
            Terms & Conditions
          </h1>
          
          <div className="space-y-6 text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
            <p>
              Last Updated: August 2026.
            </p>

            <p>
              By accessing our website and submitting booking inquiries, you agree to comply with the terms and conditions outlined below.
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              1. Stay Bookings & Cancellations
            </h3>
            <p>
              All stay inquiries made through this platform are sent directly to the local village hosts. Confirmation is subject to host availability and manual verification. Stays can be cancelled directly through your dashboard at any time.
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              2. Guest Behavior & Eco-Rules
            </h3>
            <p>
              Trishul EcoHomestays is committed to plastic-free tourism. Guests are expected to respect local community traditions, minimize physical waste, and strictly avoid introducing single-use plastics into the homestay properties.
            </p>

            <h3 className="text-base font-extrabold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              3. Liability & Insurance
            </h3>
            <p>
              Trishul EcoHomestays operates as a direct booking connector linking travelers with local village communities. While we inspect every property for hygiene and basic safety standards, we are not liable for accidental injuries or personal property loss during your stay.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
