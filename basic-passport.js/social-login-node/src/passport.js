const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const facebookPassportConfig = () => {
  return passport.use(
    new FacebookStrategy(
      {
        clientID: "API_KEY", // from facebook developer
        clientSecret: "API_KEY", // from facebook developer
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        profileFields: ["id", "displayName", "name", "email"],
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        try {
          if (profile) {
            req.user = profile;
            done(null, profile);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

const googlePassportConfig = () => {
  return passport.use(
    new GoogleStrategy(
      {
        clientID: "API_KEY", // from console google developer
        clientSecret: "API_KEY", // from console google developer
        callbackURL: "http://localhost:4000/auth/google/callback",
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        try {
          if (profile) {
            req.user = profile;
            done(null, profile);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = {
  facebookPassportConfig,
  googlePassportConfig,
};
