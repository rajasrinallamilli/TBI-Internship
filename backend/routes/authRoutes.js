const passport = require("passport");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

const User = require("../models/User");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

// Rate limiter for register and login routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 requests
  message: {
    message: "Too many attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ==============================
// REGISTER USER
// POST /api/auth/register
// ==============================

router.post(
  "/register",
  authLimiter,

  // Input validation
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters"),
  ],

  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { name, email, password } = req.body;

      // Check whether the email is already registered
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "An account with this email already exists",
        });
      }

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // Return success response
      res.status(201).json({
        message: "Registration successful",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      res.status(500).json({
        message: "Server error while registering the user",
      });
    }
  }
);

// ==============================
// LOGIN USER
// POST /api/auth/login
// ==============================

router.post(
  "/login",
  authLimiter,

  // Input validation
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required"),
  ],

  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Compare entered password with hashed password
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Return token and user details
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);

      res.status(500).json({
        message: "Server error while logging in",
      });
    }
  }
);

// ==============================
// GET LOGGED-IN USER PROFILE
// GET /api/auth/profile
// ==============================

router.get("/profile", requireAuth, async (req, res) => {
  try {
    // Find logged-in user without returning the password
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Server error while fetching profile",
    });
  }
});

// =====================================
// GOOGLE LOGIN
// GET /api/auth/google
// =====================================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);


// =====================================
// GOOGLE OAUTH CALLBACK
// GET /api/auth/google/callback
// =====================================

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,

    // Google login fails
    failureRedirect:
      "http://localhost:5173/login?error=google-login-failed",
  }),

  async (req, res) => {
    try {
      // Generate JWT for Google user
      const token = jwt.sign(
        {
          userId: req.user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );

      // Redirect user to frontend
      // with JWT token
      res.redirect(
        `http://localhost:5173/oauth-success?token=${token}`
      );
    } catch (error) {
      console.error(
        "Google OAuth callback error:",
        error
      );

      res.redirect(
        "http://localhost:5173/login?error=google-login-failed"
      );
    }
  }
);

module.exports = router;