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
    //   console.log({profile: profile})
    //   console.log("Success");

      //----Find or create user after check----//
      const doesGoogleUserExist = await User.findOne({ googleId: profile.id });

      let user;

      if(!doesGoogleUserExist) {
         user = {profile: profile}
      }
      done(null, user);
    }
  )
);
