const express = require('express');
// const { route } = require('.');
const router = express.Router();
const { Post,User } = require("../../models");
const auth = require("../../utils/auth");

router.get("/", (req, res) => {
    Post.findAll({
        include: [{
            model: User,
            attributes: {
            exclude: ["password","updatedAt"]
        }
        }]
    }).then(dbPosts => {
        if (dbPosts.length) {
            res.json(dbPosts)
        } else {
            res.status(404).json({ message: "No posts found in db" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: "An error occured getting all posts", err: err })
    });
});

router.post("/", auth, (req, res) => {
    // if(!req.session.user){
    //     return res.status(401).send("please login first")
    // }
    console.log(req.session.UserId)
    Post.create({
        content: req.body.content,
        date_seen: req.body.date_seen,
        //pass in UserId of logged in user session (rq.session.user.id)
        UserId: req.session.UserId
    }).then(newPost => {
        res.json(newPost);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "An error occured", err: err })
    })
})

router.delete("/:id",(req,res)=>{
    Post.destroy({
        where:{
            id:req.params.id
        }
    }).then(delPost=>{
        res.json(delPost)
    })
})

module.exports=router;