const express = require('express')
const app = express();
const config = require("./config/keys");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//Database
mongoose.connect(`${config.DB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
 console.log("connected")
})

app.get("/", (req, res) => {
    res.send({msg: "Hello world"})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))