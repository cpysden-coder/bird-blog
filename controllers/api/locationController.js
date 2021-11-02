const express = require('express');
// const { route } = require('.');
const router = express.Router();
const { Location } = require("../../models");

router.get("/", (req, res) => {
    Location.findAll().then(dbLocation => {
        if (dbLocation.length) {
            res.json(dbLocation)
        } else {
            res.status(404).json({ message: "No locations found in db" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: "An error occured getting all birds", err: err })
    });
});

router.post("/", (req, res) => {
    Location.create({
        name: req.body.name,
        lat: req.body.lat,
        long: req.body.long,
    }).then(newLocation => {
        res.json(newLocation);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "An error occured", err: err })
    })
})

module.exports=router;