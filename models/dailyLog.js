// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

var DailyLogSchema = new Schema({
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
});

var DailyLog = mongoose.model("DailyLog", DailyLogSchema);

module.exports = DailyLog;