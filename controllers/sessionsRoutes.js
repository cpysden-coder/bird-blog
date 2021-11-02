// const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get("/", (req,res)=> {
    res.json(req.session)
});

//creates a session key of count and increments it. 
router.get("/addcounter", (req,res)=>{
    if(req.session.count){
        req.session.count++
    } else {
        req.session.count=1
    } res.send("count updated")
});

//add a session route that adds authentication. If a user is logged in, then they can access a particular page
router.get("/birdgroup", (req,res)=>{
    //if user is logged in - check if there's a user object attached to session
    if(req.session.user) {
        res.send(`welcome to the secret club ${req.session.user.username}`)
    } else {
        res.status(401).send("login first please")
    }
})

module.exports=router;