const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2
    },
    forename: {
        type: String,
        required: false,
        default: null,
    },
    surname: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null,
        min: 6
    }
})

module.exports = User = mongoose.model("users", userSchema);