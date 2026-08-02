const { GoogleGenAI } = require("@google/genai");

const generateTripPlan = async (destination, days, people, interest) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  // Initialize the new Google Gen AI client
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `
You are an expert eco-tourism travel guide.
Generate a structured, sustainable ${days}-day travel itinerary for ${destination} for a ${people} trip who are interested in: ${interest}.
Provide high quality recommendations including morning, afternoon, evening activities, food recommendations (authentic local cuisine), travel tips, estimated budget breakdown, packing suggestions, and nearby attractions.
`;

  const tripSchema = {
    type: "OBJECT",
    properties: {
      tripTitle: { type: "STRING" },
      destination: { type: "STRING" },
      durationDays: { type: "INTEGER" },
      budgetEstimation: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            category: { type: "STRING", description: "e.g., Accommodation, Food, Local Transport, Activities" },
            cost: { type: "STRING", description: "e.g., 5000 INR" },
            details: { type: "STRING", description: "e.g., Eco-stay and cottage bookings" }
          },
          required: ["category", "cost"]
        }
      },
      travelTips: {
        type: "ARRAY",
        items: { type: "STRING" }
      },
      packingSuggestions: {
        type: "ARRAY",
        items: { type: "STRING" }
      },
      nearbyAttractions: {
        type: "ARRAY",
        items: { type: "STRING" }
      },
      dayWiseItinerary: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            dayNumber: { type: "INTEGER" },
            dayTitle: { type: "STRING" },
            activities: {
              type: "OBJECT",
              properties: {
                morning: { type: "STRING" },
                afternoon: { type: "STRING" },
                evening: { type: "STRING" }
              },
              required: ["morning", "afternoon", "evening"]
            },
            foodRecommendation: { type: "STRING" }
          },
          required: ["dayNumber", "dayTitle", "activities"]
        }
      }
    },
    required: [
      "tripTitle",
      "destination",
      "durationDays",
      "budgetEstimation",
      "travelTips",
      "packingSuggestions",
      "nearbyAttractions",
      "dayWiseItinerary"
    ]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: tripSchema,
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("========== GEMINI API ERROR ==========");
    console.error(error.message);
    throw error;
  }
};

module.exports = {
  generateTripPlan,
};
