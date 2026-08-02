const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Homestay = require("../models/Homestay");

const sampleHomestays = [
  {
    title: "Trishul Forest Retreat",
    description: "Nestled within the deep pine forests of Rishikesh, this eco-friendly cottage offers a serene mountain stream, organic vegetable gardens, and an open yoga deck overlooking the valley. Experience local cuisine prepared with fresh, home-grown ingredients and enjoy guided morning hikes in the Himalayan foothills.",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
    ],
    location: "Rishikesh, Uttarakhand",
    price: 3500,
    rating: 4.8,
    reviewsCount: 3,
    roomType: "Cottage",
    maxGuests: 4,
    amenities: ["Organic Meals", "Forest Trekking", "Yoga Deck", "Mountain Stream", "Wifi", "Bonfire Pit"],
    nearbyPlaces: [
      { name: "Laxman Jhula", distance: "4.5 km" },
      { name: "Neer Garh Waterfall", distance: "2.1 km" },
      { name: "Triveni Ghat", distance: "6.8 km" }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Rishikesh+Forest+Retreat",
    reviews: [
      {
        user: "Aarav Sharma",
        rating: 5,
        comment: "An absolute slice of paradise! The organic meals were delicious and the sounds of the stream nearby were so relaxing.",
        date: new Date("2026-06-15")
      },
      {
        user: "Riya Patel",
        rating: 4,
        comment: "Very clean cottages and helpful staff. Highly recommend the guided forest trek.",
        date: new Date("2026-07-02")
      },
      {
        user: "John Doe",
        rating: 5,
        comment: "Exceeded my expectations. The yoga deck at sunrise was breathtaking.",
        date: new Date("2026-07-20")
      }
    ]
  },
  {
    title: "Trishul Orchard Cabin",
    description: "Located inside a family-owned apple orchard in Mukteshwar, this wooden cabin provides breathtaking 180-degree views of the Nanda Devi peaks. Complete with a stone fireplace, private outdoor seating, pet-friendly lawns, and cozy blankets, it is the perfect quiet getaway for writers and nature lovers.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&w=800&q=80"
    ],
    location: "Mukteshwar, Nainital",
    price: 4200,
    rating: 4.9,
    reviewsCount: 2,
    roomType: "Suite",
    maxGuests: 2,
    amenities: ["Fireplace", "Apple Orchards", "Pet Friendly", "Private Balcony", "Wifi", "Kitchenette"],
    nearbyPlaces: [
      { name: "Chauli Ki Jali", distance: "3.2 km" },
      { name: "Mukteshwar Temple", distance: "3.0 km" },
      { name: "Bhalu Gaad Waterfall", distance: "9.5 km" }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Mukteshwar+Orchard+Cabin",
    reviews: [
      {
        user: "Vikram Malhotra",
        rating: 5,
        comment: "Waking up to the view of snow-capped mountains right from the bed was amazing. Cozy fireplace kept us warm.",
        date: new Date("2026-05-10")
      },
      {
        user: "Elena Rostova",
        rating: 5,
        comment: "Loved the orchards! Peaceful, serene, and perfect for working remotely.",
        date: new Date("2026-07-12")
      }
    ]
  },
  {
    title: "Trishul Riverview Homestay",
    description: "Enjoy peaceful soundscapes right on the banks of a sparkling river in Chopta. Built entirely from local stones and timber, this homestay runs fully on solar power. Unwind with farm-to-table dining, local bird watching excursions, and cozy reading corners overlooking the rushing waters.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
    ],
    location: "Chopta, Uttarakhand",
    price: 2800,
    rating: 4.6,
    reviewsCount: 2,
    roomType: "Room",
    maxGuests: 3,
    amenities: ["River Access", "Solar Powered", "Bird Watching", "Eco Toilets", "Organic Food", "Parking"],
    nearbyPlaces: [
      { name: "Tungnath Temple", distance: "12.0 km" },
      { name: "Deoria Tal", distance: "8.5 km" },
      { name: "Ukhimath", distance: "15.0 km" }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Chopta+Riverview+Homestay",
    reviews: [
      {
        user: "Aditi Rao",
        rating: 4,
        comment: "Beautiful riverside location. It is a bit remote, which was exactly what we wanted to disconnect.",
        date: new Date("2026-06-25")
      },
      {
        user: "Devendra Singh",
        rating: 5,
        comment: "Excellent organic meals. The owner is very friendly and showed us local bird species.",
        date: new Date("2026-07-05")
      }
    ]
  },
  {
    title: "Trishul Himalayan Vista",
    description: "Perched high in Auli, this premium villa is a dream destination for winter sports and panoramic Himalayan scenery. Features modern heating, a traditional fireplace, mountain-facing glass balconies, and ski gear rental directly on site. Truly an eco-luxury alpine experience.",
    image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"
    ],
    location: "Auli, Chamoli",
    price: 5000,
    rating: 4.9,
    reviewsCount: 3,
    roomType: "Villa",
    maxGuests: 6,
    amenities: ["Snow Balcony", "Heating System", "Traditional Fireplace", "Ski Equipment", "High-speed Wifi", "Hot Water"],
    nearbyPlaces: [
      { name: "Auli Ski Slope", distance: "0.5 km" },
      { name: "Auli Ropeway", distance: "1.2 km" },
      { name: "Joshimath", distance: "10.0 km" }
    ],
    googleMapsUrl: "https://maps.google.com/?q=Auli+Himalayan+Vista+Villa",
    reviews: [
      {
        user: "Kabir Mehta",
        rating: 5,
        comment: "Phenomenal! Skiing during the day and sitting by the fireplace at night was unmatched.",
        date: new Date("2026-01-20")
      },
      {
        user: "Anjali Gupta",
        rating: 5,
        comment: "Most beautiful villa in Auli. High-speed internet worked perfectly too.",
        date: new Date("2026-02-15")
      },
      {
        user: "Michael S.",
        rating: 4.8,
        comment: "Stunning snow views. Will definitely visit again in the winter.",
        date: new Date("2026-03-01")
      }
    ]
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected. Clearing old homestays data...");
    await Homestay.deleteMany({});
    console.log("Inserting new sample homestays...");
    await Homestay.insertMany(sampleHomestays);
    console.log("✅ Database seeded successfully with 4 premium homestays!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
