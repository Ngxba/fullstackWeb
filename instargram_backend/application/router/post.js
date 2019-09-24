var express = require("express");
var router = express.Router();
const postService = require("../../domain/service/postService")
var multer = require("multer")
var uuidv4 = require("uuid/v4")



const storage = multer.diskStorage({
    destination : (req, file, callback) =>{
        callback(null, "static/images/")
    },
    filename : (req, file, callback) =>{
                callback(null,uuidv4() + file.originalname)
    }
})

const upload = multer({
    storage
})
//create new post
router.post("/" ,upload.single("image"), (req, res) =>{
    try{
        const {email, content} = req.body;
        if(!email.length || !content.length || !req.file){
            res.statusCode = 400;
            res.json({
                code : "Email or content or file is empty"
            });
            return;
        }
        console.log(req)
        const post = postService.savePost(email, content,"static/images/" + req.file.filename)
        res.json(post)
    } catch(err){
        res.status = 400;
        res.json({
            message : err.message
        })

    }
})

router.get("/", async (req, res) => {
    const result  = await postService.getPost()
    const listPost = result.map(postModel => ({
        id: postModel.id,
        email: postModel._doc.email,
        content: postModel._doc.content,
        imageUrl: postModel._doc.imageUrl,
    }))
    res.json(listPost)
})

router.post("/:id/like", async (req, res) => {
    const {email} = req.body;
    const { id } = req.params
    const like = await postService.like(id, email)
    res.json({
        liked : like.indexOf(email) > -1,
        numberOfLike : like.length
    })
})

router.post("/:id/comment", async (req,res) => {
    const {email, content} = req.body;
    const {id} = req.params;
    postService.comment(id, email, content);
    
})
module.exports = router ;