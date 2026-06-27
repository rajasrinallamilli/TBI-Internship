const homestays = require("./data/homestays");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to Trishul Ecohomestays Backend 🚀");
});

// Port
const PORT = process.env.PORT || 5000;
app.get("/api/homestays", (req, res) => {
    res.status(200).json(homestays);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/api/homestays/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const homestay = homestays.find(h => h.id === id);

    if (!homestay) {
        return res.status(404).json({ message: "Homestay not found" });
    }

    res.json(homestay);
});
app.post("/api/homestays", (req, res) => {
    const newHomestay = {
        id: homestays.length + 1,
        ...req.body
    };

    homestays.push(newHomestay);

    res.status(201).json(newHomestay);
});
app.put("/api/homestays/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = homestays.findIndex(h => h.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Homestay not found" });
    }

    homestays[index] = {
        ...homestays[index],
        ...req.body
    };

    res.json(homestays[index]);
});
app.delete("/api/homestays/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = homestays.findIndex(h => h.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Homestay not found" });
    }

    homestays.splice(index, 1);

    res.status(204).send();
});
app.get("/api/search", (req, res) => {
    const location = req.query.location;

    const filtered = homestays.filter(
        h => h.location.toLowerCase() === location.toLowerCase()
    );

    res.json(filtered);
});