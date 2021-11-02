const express = require('express');
// const { route } = require('.');
const router = express.Router();
const { Bird } = require("../../models");

router.get("/", (req, res) => {
    Bird.findAll().then(dbBird => {
        if (dbBird.length) {
            res.json(dbBird)
        } else {
            res.status(404).json({ message: "No birds found in db" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: "An error occured getting all birds", err: err })
    });
});

router.post("/", (req, res) => {
    Bird.create({
        name: req.body.name,
        image_ref: req.body.image_ref,
    }).then(newBird => {
        res.json(newBird);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "An error occured", err: err })
    })
})

module.exports=router;