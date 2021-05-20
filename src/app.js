const express = require('express');
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
require("./models/User");
require("./services/Passport");

//Database
mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
 console.log("connected")
})

//---- Routes ----//
const auth = require('./routes/auth');

//---- Middleware ----//
app.use(express.json());
app.use(cookieParser());
app.use('/', auth);

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}!`
  );

//   console.log(`${require("crypto").randomBytes(64).toString("hex")}`);
});