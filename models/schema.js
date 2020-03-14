// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

// Total Calculations Schema

var TotalCalcSchema = new Schema({
    mean:{
        type: Number
    },
    median:{
        type: Number
    },
    max:{
        type: Number
    },
    min:{
        type: Number
    },
    iqr:{
        type: Number
    },
})

//var TotalCalc = mongoose.model("Calculations", TotalCalcSchema);

// Daily Calculations Schema
var DailyCalcSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    mood_average: {
        type: Number
    },
    self_average: {
        type: Number
    },
    work_school_mood: {
        type: Number
    },
    life_mood: {
        type: Number
    },
    world_mood: {
        type: Number
    },
});

// First Time Schema
var FirstTimeSchema = new Schema ({
    reasons: [],
    preferred_time: {
        type: Number
    },
    current_self: [],
    future_self: [],
    element_stress: [],
    element_joy: [],
    goals: []
})

// Daily Journal Schema

var DailyJournalSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    feels: {
        type: String
    }
});

// Daily Log Schema

var DailyLogSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    answer_1: {
        type: Number
    },
    answer_2: {
        type: Boolean,
        default: false
    },
    answer_3: {
        type: Number
    },
    answer_4: {
        type: Number
    },
    answer_5: {
        type: Number
    }
});

// User Schema

var UserSchema = new Schema({
    username: {
        type: String,
        required: "Please enter your username",
        trim: true
    },
    password: {
        type: String,
        required: "Please enter your password",
        trim: true
    },
    first_quiz: [ FirstTimeSchema ],
    daily_log: [ DailyLogSchema ],
    daily_journal: [ DailyJournalSchema ],
    daily_calc: [ DailyCalcSchema ],
    total_cal:  [ TotalCalcSchema ]
    
});

var users = mongoose.model("users", UserSchema);


module.exports = users;