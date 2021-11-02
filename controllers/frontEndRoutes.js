const express = require('express');
const router = express.Router();

const {Post, User} = require("../models");

//render home page (home.handlebars)
router.get("/", (req,res)=> {
    Post.findAll({
        order:["UserId"],
        include:[User]
    }).then(postData=>{
        const hbsPosts = postData.map(post=>post.get({plain:true}))
        res.render("home",{
            posts:hbsPosts
        })
    })
})

//profile page
router.get("/profile", (req,res)=>{
    if(!req.session.user) {
        return res.status(401).send("please login first")
    }
    User.findByPk(req.session.user.id,{
        include: [Post]
    }).then(userData=>{
        //serialize data
        const hbsUser = userData.get({plain:true})
        //render profile template
        res.render("profile", hbsUser)
    })
})

module.exports=router;
