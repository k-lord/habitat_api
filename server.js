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
app.post("/submit", function(req, res) {
    // Create a new user using req.body
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

// 'GET' / 'find' all Users
app.get('/user', function (req, res) {
    db.User.find({}, function (err, found) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(found);
        }
    });
});

// 'GET' / 'findOne' User by _id
app.get('/user/:_id', function (req, res) {
    db.User.findOne({ _id: req.params.id })
        .then(function (dbUser) {
            res.json(dbUser)
        })
        .catch(function (err) {
            res.json(err);
        });
});

// 'PUT' / 'findOneAndUpdate' User's Daily Log by user _id

app.put('/user/:_id/log', function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, 
        {
            '$push': {
                'daily_log': {req.body
                }
            }
        })
    .then(function(dailyLog) {
        res.json(dailyLog)
    })
    .catch(function(err) {
        res.json(err);
    });
});

// 'POST' / 'create' new DailyLog

// 'GET' / 'find' all DailyLogs

// 'GET' / 'findOne' DailyLog by _id

// 'POST' / 'create' new DailyJournal

// 'GET' / 'find' all DailyJournals

// 'GET' / 'findOne' DailyJournal by _id

// 'POST' / 'create' new Calculations

// 'GET' / 'findOne' Calculation by _id

// 'PUT' / 'findOneAndUpdate' Calculations by _id

////////////////////////////////////////////////////////////////////////////////////////////////

// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server on port %d in %s mode', this.address().port, app.settings.env);
})



