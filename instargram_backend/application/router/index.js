var express = require("express")
var router = express.Router()
var authRouter = require("./auth");
var postRouter = require("./post")
var userRouter = require("./user")

router.use("/auth", authRouter)
router.use("/post", postRouter)
router.use("/user", userRouter)
module.exports = router;