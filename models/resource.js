var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var resourceSchema = new Schema({
    title:  { type: String,                required: true, match: /^(.){3,5}$/ },
    desc:   { type: String,                required: true, match: /^(.){3,1000}$/ },
    date:   { type: Date,                  required: true },
    url:    { type: String,                required: true, match: /^(http|https):\/\/[^ "]+$/ },
    type:   { type: String,                required: true, match: /^(video|image|slide)$/ },
    meetup: { type: Schema.Types.ObjectId, required: true, ref: 'Meetup' }
});

module.exports = mongoose.model('Resource', resourceSchema);    
