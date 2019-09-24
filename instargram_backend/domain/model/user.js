const mongoose = require("../../infrastructure/db")
const User = mongoose.model("User", {
    email: String,
    password : String,
    list_following : [String]
})

module.exports = User