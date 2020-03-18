// Dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var cors = require('cors');
let bodyParser = require('body-parser');

// Initializing Express App
var app = express();

// Middleware
app.use(logger('dev'));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.post("/submit", bodyParser.json(), function (req, res) {
    // Create a new user using req.body
    db.users.create(req.body)
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// 'GET' / 'find' all Users
app.get('/user', function (req, res) {
    db.users.find({}, function (err, found) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(found);
        }
    });
});

// 'GET' / 'findById' to find a specific User by _id
app.get('/user/:_id', function (req, res) {
    db.users.findById({ _id: req.params._id }, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            let tempUser = {...user.toObject()}
            tempUser.answer1Arr = user.daily_log.reduce((r, i)=>r + i.answer_1, 0)
            console.log("100%")
            console.log(tempUser2)
            res.json(user)
        }
    })
});

// 'PUT' / 'findOneAndUpdate ' to save the First Quiz Object to a specific User found by _id

app.put('/user/:_id/firstquiz', function (req, res) {

    var quizObj = req.body;

    db.users.findOneAndUpdate(
        { _id: req.params._id },
        { '$push': { 'first_quiz': quizObj } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success)
            }
        })
        .then(function (dbUserUpdate) {
            res.json(dbUserUpdate)
        });
});

// 'PUT' / 'findOneAndUpdate' to push a new Daily Log Object into a specific User found by _id

app.put('/user/:_id/newlog', function (req, res) {

    var logObj = req.body;

    db.users.findOneAndUpdate(
        { _id: req.params._id },
        { '$push': { 'daily_log': logObj } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })
        .then(function (dbUserUpdate) {
            res.json(dbUserUpdate)
        });
});

// 'PUT' / 'findOneAndUpdate' to $set updated Total Calculations Object into a specific User found by _id

app.put('/user/:_id/newtotalcalc', function (req, res) {
    var calcObj = req.body;

    db.users.findOneAndUpdate(
        {_id: req.params._id},
        { '$set': {'total_calc': calcObj } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });   
});

// 'PUT' / 'findOneAndUpdate' to push a new Daily Calculations Object into a specific User found by _id

app.put('/user/:_id/newdailycalc', function (req, res) {

    var calcObj = req.body;

    db.users.findOneAndUpdate(
        { _id: req.params._id },
        { '$push': { 'daily_calc': {calcObj} } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })
        .then(function (dbUserUpdate) {
            res.json(dbUserUpdate)
        });
});

// 'PUT' / 'findOneAndUpdate' to push a new Daily Journal Object into a specific User found by _id

app.put('/user/:_id/newjournal', function (req, res) {

    var journalObj = req.body;

    db.users.findOneAndUpdate(
        { _id: req.params._id },
        { '$push': { 'daily_journal': journalObj } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        })
        .then(function (dbUserUpdate) {
            res.json(dbUserUpdate)
        });
});


// 'PUT' / 'findOneAndUpdate' to edit existing Daily Journal Object by Journal _id

app.put('/user/:_id/editjournal', function (req, res) {

    var journalObj = req.body;

    db.users.findOneAndUpdate(
        { _id: req.params._id, "daily_journal._id": journalObj._id },
        {
            "$set": {
                "daily_journal.$": journalObj
            }
        },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});


// 'PUT' / 'findOneAndDelete' to delete existing Daily Journal Object by Journal _id

//!!! Currently deletes the whole user instead of just the journal entry

/*
app.put('/user/:_id/deletejournal', function (req, res) {

    var journalObj = req.body;

    db.users.findOneAndDelete(
        { _id: req.params._id, "daily_journal._id": journalObj._id }, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
    });

});
*/


////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3001, function () {
    console.log('Express server on port %d in %s mode', this.address().port, app.settings.env);
})



