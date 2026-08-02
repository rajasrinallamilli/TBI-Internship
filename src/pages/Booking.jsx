import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Button,
  Input,
  Modal,
} from "../components/ui";

const API = import.meta.env.VITE_API_URL;

function Booking() {
  const { id } = useParams();

const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);
const [homestay, setHomestay] = useState(null);

const [booking, setBooking] = useState({
  checkIn: "",
  checkOut: "",
  guests: "",
  room: "",
  name: "",
  phone: "",
  email: "",
});
useEffect(() => {
  fetchHomestay();
}, []);

const fetchHomestay = async () => {
  try {
    const res = await axios.get(`${API}/api/homestays/${id}`);

    setHomestay(res.data);

    setBooking((prev) => ({
      ...prev,
      room: res.data.title,
    }));

  } catch (error) {
  console.error(error);
  console.log(error.response);

  toast.error(
    error.response?.data?.message || "Unable to load homestay."
  );
}
};
const handleChange = (e) => {

  setBooking({

    ...booking,

    [e.target.name]: e.target.value,

  });

};

  const submitHandler = async (e) => {

  e.preventDefault();

  if (
    !booking.checkIn ||
    !booking.checkOut ||
    !booking.guests ||
    !booking.name ||
    !booking.phone ||
    !booking.email
  ) {

    toast.error("Please fill all fields.");

    return;

  }

  setLoading(true);

  try {

    const res = await axios.post(
      `${API}/api/bookings`,
      booking
    );

    toast.success(res.data.message);

    setOpen(true);

    setBooking({
      checkIn: "",
      checkOut: "",
      guests: "",
      room: "Mountain View Cottage",
      name: "",
      phone: "",
      email: "",
    });

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Booking Failed"
    );

  } finally {

    setLoading(false);

  }

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
{homestay && (
  <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8">

    <img
      src={homestay.image}
      alt={homestay.title}
      className="w-full h-64 object-cover"
    />

    <div className="p-6">

      <h2 className="text-3xl font-bold">
        {homestay.title}
      </h2>

      <p className="text-gray-500 mt-2">
        📍 {homestay.location}
      </p>

      <p className="text-emerald-700 font-bold text-2xl mt-2">
        ₹{homestay.price} / Night
      </p>

    </div>

  </div>
)}
        <form
          onSubmit={submitHandler}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 dark:text-white p-8 rounded-3xl shadow-xl">
          <div className="mb-4">
            <label className="block mb-2">Check-In Date</label>
            <input
type="date"
name="checkIn"
value={booking.checkIn}
onChange={handleChange}
className="w-full border rounded-lg p-3"
/>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Check-Out Date</label>
            <input
type="date"
name="checkOut"
value={booking.checkOut}
onChange={handleChange}
className="w-full border rounded-lg p-3"
/>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Guests</label>
           <input
type="number"
name="guests"
value={booking.guests}
onChange={handleChange}
className="w-full border rounded-lg p-3"
/>
          </div>
<div className="mb-4">
  <label className="block mb-2">
    Selected Homestay
  </label>

  <input
    type="text"
    value={booking.room}
    readOnly
    className="w-full border rounded-lg p-3 bg-gray-100 dark:bg-gray-700"
  />
</div>
        

       <Input
label="Full Name"
name="name"
value={booking.name}
onChange={handleChange}
placeholder="Enter your name"
/>

          <Input
label="Phone Number"
name="phone"
value={booking.phone}
onChange={handleChange}
type="tel"
placeholder="Enter phone number"
/>

        <Input
label="Email"
name="email"
value={booking.email}
onChange={handleChange}
type="email"
placeholder="Enter email"
/>  

          <div className="mt-6">
            <Button

variant="primary"

size="lg"

disabled={loading}

>

{loading

? "Submitting..."

: "Send Booking Inquiry"}

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