const mongoose = require("../../infrastructure/db")
const Schema  = mongoose.Schema

const Comment = new Schema({
    email : String,
    content : String,
})

const Post = mongoose.model("Post", {
    email: String,
    content : String,
    imageUrl : String,
    like : [String],
    comments : [Comment]
})


module.exports = Post