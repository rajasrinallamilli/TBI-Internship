import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  Modal,
} from "../components/ui";

function Booking() {
  const [open, setOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    toast.success("Booking Confirmed!");

    setOpen(true);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 dark:from-gray-900 dark:to-black p-10">
        <h1 className="text-5xl font-bold text-center text-emerald-700 mb-10">
          Booking Inquiry
        </h1>

        <p className="text-center text-gray-500 mb-4">
          Book directly and save OTA commission fees.
        </p>

        <form
          onSubmit={submitHandler}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 dark:text-white p-8 rounded-3xl shadow-xl">
          <div className="mb-4">
            <label className="block mb-2">Check-In Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Check-Out Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Guests</label>
            <input
              type="number"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Room Preference</label>
            <select className="w-full border rounded-lg p-3">
              <option>Mountain View Cottage</option>
              <option>Forest Retreat</option>
              <option>Family Eco Villa</option>
            </select>
          </div>

          <Input
            label="Full Name"
            placeholder="Enter your name"
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
          />

          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
            >
              Send Booking Inquiry
            </Button>
          </div>
        </form>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Booking Successful"
        >
          <p>
            Your booking inquiry has been submitted successfully.
          </p>
        </Modal>
      </main>

      <Footer />
    </>
  );
}

export default Booking;