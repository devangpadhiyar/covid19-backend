const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require("path");


const app = express();


// Load .env file
dotenv.config({path: '.env'});


// configure database
require('./config/database');

// Load models first
require("./models");


// Passport config
const passportConfig = require('./config/passport');
const passport = require("passport");



// Load passport middleware for authentication
require('./config/passport')(passport);

/*
 Middlewares
 */
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({extended: true}));

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());


// Static files
app.use(express.static(path.join(__dirname, 'static')));

// Map routes
const routes = require('./routes');


app.use(routes);

// Add default error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.stack);
});

app.use(function (req, res, next) {
    res.status(404).send("Page not found!")
})




// Export app
module.exports = app;
