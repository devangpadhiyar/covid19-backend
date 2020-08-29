const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const upload = multer();

const app = express();

// Load .env file
dotenv.config({ path: '.env' });

// configure database
require('./config/database');

// Load models first
require('./models');

// Passport config
const passport = require('passport');
const passportConfig = require('./config/passport');

// Load passport middleware for authentication
require('./config/passport')(passport);

/*
 Middlewares
 */
app.use(bodyParser.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(passport.initialize());

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

// Static files
app.use(express.static(path.join(__dirname, 'static')));

// Map routes
const routes = require('./routes');

app.use(routes);

// Add default error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

app.use(function (req, res, next) {
  res.status(404).send('Page not found!');
});

// Export app
module.exports = app;
