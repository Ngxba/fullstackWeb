const express = require("express");
const router = express.Router();
const userService = require("../../domain/service/userService")

// Follow an user
router.post('/:following/follow', async (req,res) => {
    const {follower} = req.body;
    const {following} = req.params;
    const result = await userService.follow(follower, following);
    if (result === true) {
        res.json({
            success : true,
            follower : follower
        })
    } else {
        console.log("follow false")
    }
})

router.post('/:following/unfollow', async (req,res) => {
    const {follower} = req.body;
    const {following} = req.params;
    const result = await userService.unfollow(follower, following);
    if (result === true) {
        res.json({
            success : true,
            follower : follower
        })
    } else {
        console.log("unfollow false")
    }
})

module.exports = router;