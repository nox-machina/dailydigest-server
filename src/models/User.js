const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
})

const User = mongoose.model("users", userSchema);