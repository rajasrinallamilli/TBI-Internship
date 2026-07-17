const { generateTripPlan } = require("../services/huggingFaceService");

const tripPlanner = async (req, res) => {
  try {
    const { destination, days, people, interest } = req.body;

    const tripPlan = await generateTripPlan(
      destination,
      days,
      people,
      interest
    );

    res.json({
      success: true,
      tripPlan,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  tripPlanner,
};