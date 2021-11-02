const express = require('express');
const router = express.Router();

// const frontEndRoutes = require("./frontEndRoutes.js");
// router.use(frontEndRoutes);
const apiRoutes = require("./api");
router.use("/api",apiRoutes);

const sessionRoutes = require("./sessionsRoutes")
router.use("/sessions",sessionRoutes)

const frontEndRoutes = require("./frontEndRoutes")
router.use(frontEndRoutes);

module.exports=router;