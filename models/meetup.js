var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var meetupSchema = new Schema({
    title: { type: String, required: true, match: /^(.){3,100}$/ },
    desc:  { type: String, required: true, match: /^(.){3,1000}$/ },
    date:  { type: Date,   required: true },
    url:   { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ }
});

module.exports = mongoose.model('Meetup', meetupSchema);
