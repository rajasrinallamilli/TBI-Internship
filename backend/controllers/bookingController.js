const Booking = require("../models/Booking");

// CREATE
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking Failed",
    });
  }
};

// READ
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: "Unable to fetch bookings",
    });

  }
};

// UPDATE
const updateBooking = async (req, res) => {

  try {

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking Updated Successfully",
      booking,
    });

  } catch (error) {

    res.status(500).json({
      message: "Update Failed",
    });

  }

};

// DELETE
const deleteBooking = async (req, res) => {

  try {

    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found",
      });

    }

    res.status(200).json({
      message: "Booking Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete Failed",
    });

  }

};

module.exports = {

  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,

};