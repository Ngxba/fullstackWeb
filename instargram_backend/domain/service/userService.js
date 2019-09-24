const User = require("../model/user")

const userService = {
    follow: async (follower, following) =>{
        const result = await User.updateOne({email : following},
            {
                $push : {
                    list_following : follower
                }
            });
        return result.nModified === 1;
    },

    unfollow: async (follower, following) =>{
        const result = await User.updateOne({email : following},
            {
                $pull : {
                    list_following : follower
                }
            });
        return result.nModified === 1;
    }
}

module.exports = userService;