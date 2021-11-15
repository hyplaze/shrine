const mongoose = require("mongoose");

const website = new mongoose.Schema({
    MasterUser: String,
    boxid: String,
    boxname: String,
    twoFA: String,
    username: String,
    url: String,
    password: String,
    university: String,

})

module.exports = mongoose.model("website_model", website);