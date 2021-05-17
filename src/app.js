const express = require('express');
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//Database
mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
 console.log("connected")
})

app.get("/", (req, res) => {
    res.send({msg: "Hello world"})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))