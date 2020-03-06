// Dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');

// Initializing Express App
var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Database Config
var db = require('./models');

// Mongoose Config
mongoose.connect('mongodb://localhost/habitat', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

////////////////////////////////////////////////////////////////////////////////////////////////

// HTML Route for index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// API Routes will go here

// 'POST' / 'create' new User

// 'GET' / 'find' all Users

// 'GET' / 'findOne' User by _id

// 'PUT' / 'findOneAndUpdate' User by _id

// 'POST' / 'create' new DailyLog

// 'POST' / 'create' new DailyJournal

// 'POST' / 'create' new Calculations

// 'PUT' / 'findOneAndUpdate' Calculations by _id

////////////////////////////////////////////////////////////////////////////////////////////////

// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server on port %d in %s mode', this.address().port, app.settings.env);
})



