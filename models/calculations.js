// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

var CalculationsSchema = new Schema({
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

var Calculations = mongoose.model("Calculations", CalculationsSchema);

module.exports = Calculations;