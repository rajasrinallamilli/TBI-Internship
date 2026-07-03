require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const homestayRoutes = require("./routes/homestayRoutes");
const Homestay = require("./models/Homestay");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/homestays", homestayRoutes);

app.get("/api/search", async (req, res) => {
  try {
    const location = req.query.location;

    const homestays = await Homestay.find({
      location: { $regex: location, $options: "i" },
    });

    res.json(homestays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});