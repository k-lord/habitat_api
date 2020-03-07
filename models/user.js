// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    daily_log: [{
        date: {
            type: Date,
            default: Date.now
        },
        answer_1: {
            type: Number
        },
        answer_2: {
            type: Number
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
    }],
    daily_journal: [{
        date: {
            type: Date,
            default: Date.now
        },
        feels: {
            type: String
        }
    }],
    total_calculations: [
        {
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
        }]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;