// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

// Total Calculations Schema

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
    plus_plus_mood: {
        type: Number
    },
    plus_mood: {
        type: Number
    },
    minus_mood: {
        type: Number
    },
    minus_minus_mood: {
        type: Number
    }
});

var DailyCalc = mongoose.model("DailyCalc", DailyCalcSchema);

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

var FirstTime = mongoose.model("FirstTime", FirstTimeSchema)

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

var DailyJournal = mongoose.model("DailyJournal", DailyJournalSchema);

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

var DailyLog = mongoose.model("DailyLog", DailyLogSchema);

// User Schema

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    properties: [ FirstTime ],
    daily_log: [ DailyLog ],
    daily_journal: [ DailyJournal ],
    daily_calc: [ DailyCalc ],
    
});

var User = mongoose.model("User", UserSchema);


module.exports = DailyCalc, FirstTime, DailyJournal, DailyLog, User;