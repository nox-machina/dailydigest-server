const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const verify = require("../middleware/verify");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    console.log("Logging In...", {user: req.user});

    //----JWT----//
    const payload = {
        user: {
            id: req.user._id
        }
    }
    
    jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "60 seconds"}, (err, token) => {
        console.log(`Generating Token... ${token}`)
        if (!err) {
            res.cookie('token', token);
            res.redirect("/");
        }
    })
  }
);










//----Temp Redirect Route----//
router.get("/", verify, async (req, res) => {
    console.log(req.cookies['token'])
    res.send({message: "Success"})
})

router.get("/token/test", verify, async (req, res) => {
    console.log("Auth works.")
    res.send({message: "Verification Successful."})
})

//--done--//
//auth using google oauth
//if gUser exists return gUser else create new user
//redirect route >> generate JWT and set-cookie

//custom auth
//signup/login using email password
//jwt is generate and cookie set

//--setup done--//
//jwt verification middleware for all following requests

module.exports = router;