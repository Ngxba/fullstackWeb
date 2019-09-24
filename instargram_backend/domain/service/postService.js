const Post = require("../model/post")

const postService = {

    getPost: () => {
        return Post.find({});
    },

    savePost: (email, content, imageUrl) => {
        const post = new Post({
            email, content, imageUrl
        })
        post.save();
        return post
    },

    like : async (postId , email) => {
        const post = await Post.findById(postId).select("like");
        console.log(post.like)
        if(!post.like){
            post.like = [];
        }
        if(post.like.find(item => item === email) != null){
            // user liked before
            post.like = post.like.filter(item => item !== email)
        } else {
            // user not like yet
            post.like.push(email);
        }
        
        await post.save()
        return post.toObject().like ;
    },

    comment : async (postId, email, content) =>{
        const result = await Post.update({"_id": postId}, {
            comments : {
                $push : {email , content}
            }
        })
        console.log(result)
    }
   
}

module.exports = postService;