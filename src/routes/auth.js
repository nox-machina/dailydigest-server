const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { json } = require("body-parser");

const verify = require("../middleware/verify");
const { jwtsign } = require("../functions/jwtsign");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    console.log("Logging In...", {user: req.user});

    //----jwt sign----//
    const token = jwtsign(user._id);

    console.log(`Generating Token...`);
    res.cookie("token", token);
    res.redirect("/");
  }
);

router.post("/signup/local", async (req, res) => {

    if (!req.body.email || !req.body.username || !req.body.password) return res.status(400).send({message: "Invalid Request."})

    const existingAccount = await User.findOne({ email: req.body.email });
    if (existingAccount) return res.status(409).send({ message: "Email already in use." });

    let user;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
    });

    await user.save();

    //----jwt sign----//
    const token = jwtsign(user._id);

    console.log(`Generating Token...`);
    res.cookie("token", token);
    res.send({message: "User Created Successfully"});
})

router.post('/auth/local', async (req, res) => {
    // console.log(Object.keys(req.body).length)
    if (Object.keys(req.body).length > 2) return res.status(400).send({message: "Too Many Positional Arguments."})
      if (req.body.password && req.body.email) {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(404).send({ message: "User not found." });

        const isAuth = await bcrypt.compare(req.body.password, user.password);

        if (!isAuth)
          return res.status(400).send({ message: "Invalid Credentials." });


        //----jwt sign----//
        const token = jwtsign(user._id);

        console.log(`Generating Token...`);
        res.cookie("token", token);
        res.send({message: "Token Generated Successfully"});

      } else {
        res.status(400).send({ message: "Invalid Request." });
      }
})

//----Temp Redirect Route----//
router.get("/", verify, async (req, res) => {
    console.log(req.cookies['token'])
    res.send({message: "Success"})
})

router.get("/token/test", verify, async (req, res) => {
    console.log("Auth works.")
    res.send({message: "Verification Successful."})
})


module.exports = router;