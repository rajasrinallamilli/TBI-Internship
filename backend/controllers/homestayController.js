const Homestay = require("../models/Homestay");

// GET all homestays
const getHomestays = async (req, res) => {
  try {
    const homestays = await Homestay.find();
    res.json(homestays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single homestay
const getHomestayById = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id);

    if (!homestay) {
      return res.status(404).json({ message: "Homestay not found" });
    }

    res.json(homestay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST
const createHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.create(req.body);
    res.status(201).json(homestay);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT
const updateHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(homestay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteHomestay = async (req, res) => {
  try {
    await Homestay.findByIdAndDelete(req.params.id);

    res.json({ message: "Homestay deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHomestays,
  getHomestayById,
  createHomestay,
  updateHomestay,
  deleteHomestay,
};