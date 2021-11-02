const express = require('express');
const sequelize = require("./config/connection.js")
const dotenv = require('dotenv');
//session and cookie mgmt
const session = require("express-session");
//store session data
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 4000;

const hbs = exphbs.create({});

// Requiring our models for syncing
const { User, Bird, Location, Post } = require('./models');
const routes = require("./controllers");

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));


// Sets up the Express app to handle data parsing

//set up session handling and storing in sequelize
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    },
    store: new SequelizeStore({
        //connecting cookies to a sequelize store
        db: sequelize
    })
}))



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes);

sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    });
});