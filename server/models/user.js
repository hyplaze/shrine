const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: String,
    masterPassword: String,
    cookie: String
});

module.exports = mongoose.model("user_model", user);
