const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/google/redirect",
    },
    async (actoken, rftoken, profile, done) => {

      //----Find or create user after check----//
      const existingGoogleUser = await User.findOne({ googleId: profile.id });

      let user;

      if(!existingGoogleUser) {
         user = new User ({
           username: profile.displayName.replace(/\s/g, ""),
           email: profile._json.email,
           forename: profile.name.givenName,
           surname: profile.name.familyName,
           googleId: profile.id,
         });
      } else {
          user = existingGoogleUser;
      }
      await user.save().then(user => done(null, user))
    }
  )
);
