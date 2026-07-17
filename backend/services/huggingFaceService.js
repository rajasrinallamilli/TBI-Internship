const axios = require("axios");

const generateTripPlan = async (destination, days, people, interest) => {
  const prompt = `
You are an expert travel guide.

Generate a ${days}-day travel itinerary for ${destination}.

Traveller Type: ${people}
Interests: ${interest}

Include:
- Day-wise itinerary
- Morning activities
- Afternoon activities
- Evening activities
- Food recommendations
- Travel tips
- Estimated budget
`;

  try {
    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "Qwen/Qwen2.5-72B-Instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 700,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.log("========== HUGGING FACE ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else {
      console.log(error.message);
    }

    throw new Error("Unable to generate trip plan.");
  }
};

module.exports = {
  generateTripPlan,
};