const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users", userRoutes);

const birdRoutes = require("./birdController");
router.use("/birds", birdRoutes);

const locationRoutes = require("./locationController");
router.use("/locations", locationRoutes);

const postRoutes = require("./postController");
router.use("/posts", postRoutes);

module.exports=router;