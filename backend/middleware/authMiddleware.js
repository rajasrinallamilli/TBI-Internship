const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check whether token is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Extract token from:
    // Authorization: Bearer <token>
    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store logged-in user's ID in request
    req.user = {
      userId: decoded.userId,
    };

    // Continue to the protected route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = requireAuth;