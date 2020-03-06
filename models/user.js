// Dependencies
var mongoose = require("mongoose");

// Schema constructer reference
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    daily_log: [],
    daily_journal: [],
    total_calculations: []
});

var User = mongoose.model("User", UserSchema);

module.exports = User;