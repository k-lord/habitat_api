// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

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

module.exports = DailyJournal;