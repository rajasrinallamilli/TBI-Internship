import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setSubmitting(true);

    // Simulate API contact call
    setTimeout(() => {
      toast.success("Thank you! Your message has been received. Our team will get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dark:text-stone-100 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-emerald-700 dark:text-emerald-450 font-bold uppercase tracking-widest text-xs">Reach Out</span>
            <h1 className="text-4xl font-extrabold text-stone-850 dark:text-white mt-2">
              Contact Our Eco-Hosts
            </h1>
            <p className="text-stone-500 dark:text-stone-400 mt-3 text-sm md:text-base max-w-lg mx-auto">
              Have questions about stays, local treks, organic food, or booking inquiries? Drop us a line.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Contact Form Card (Col-span 2) */}
            <div className="md:col-span-2 bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 shadow-sm border border-stone-150 dark:border-stone-850">
              <h2 className="text-xl font-extrabold mb-6">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 mb-1">Message *</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your query details here..."
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 outline-none focus:border-emerald-600 transition"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition duration-300 cursor-pointer shadow disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            </div>

            {/* Info Panel & Map (Col-span 1) */}
            <div className="md:col-span-1 space-y-6">
              
              {/* Details Card */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-sm border border-stone-150 dark:border-stone-850 space-y-4">
                <h3 className="font-extrabold text-base mb-4">Contact Info</h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 block uppercase">Phone</span>
                    <span className="text-sm font-bold text-stone-800 dark:text-stone-200">+91 98765 43210</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 block uppercase">Email</span>
                    <span className="text-sm font-bold text-emerald-755 dark:text-emerald-450 hover:underline">
                      contact@trishuleco.com
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 block uppercase">Address</span>
                    <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                      Trishul Village, Rishikesh, Uttarakhand 249201, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-sm border border-stone-150 dark:border-stone-850">
                <div className="h-64 bg-stone-100 dark:bg-stone-850 relative flex items-center justify-center overflow-hidden">
                  {/* Simulated map graphic */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
                  
                  {/* Pin */}
                  <div className="relative z-10 text-center p-6 space-y-3">
                    <span className="text-4xl animate-bounce inline-block">📍</span>
                    <h4 className="font-bold text-xs">Trishul Village, Rishikesh</h4>
                    <a
                      href="https://maps.google.com/?q=Rishikesh+Uttarakhand"
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

export default Contact;
