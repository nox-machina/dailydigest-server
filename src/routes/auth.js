const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    console.log("Logging In...", {user: req.user});
    res.cookie('token', "ThisWillBeJWT");
    res.redirect("/");
  }
);

//----Temp Redirect Route----//
router.get("/", async (req, res) => {
    console.log(req.cookies['token'])
    res.send({message: "Success"})
})

module.exports = router;