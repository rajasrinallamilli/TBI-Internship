const passport = require("passport");

const GoogleStrategy =
  require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        "http://localhost:5000/api/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        // Check whether Google user already exists
        let user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // Get email from Google account
        const googleEmail =
          profile.emails?.[0]?.value;

        // Check whether same email already exists
        user = await User.findOne({
          email: googleEmail,
        });

        if (user) {
          // Connect Google account to existing user
          user.googleId = profile.id;

          user.profilePicture =
            profile.photos?.[0]?.value || "";

          await user.save();

          return done(null, user);
        }

        // Create new Google user
        const newUser = await User.create({
          name: profile.displayName,

          email: googleEmail,

          googleId: profile.id,

          profilePicture:
            profile.photos?.[0]?.value || "",
        });

        return done(null, newUser);
      } catch (error) {
        console.error(
          "Google Strategy Error:",
          error
        );

        return done(error, null);
      }
    }
  )
);

module.exports = passport;