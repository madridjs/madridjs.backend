var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var jobSchema = new Schema({
    title:       { type: String, required: true, match: /^(.){3,100}$/ },
    desc:        { type: String, required: true, match: /^(.){3,1000}$/ },
    date:        { type: Date,   required: true },
    url:         { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ },
    company:     { type: String, required: true, match: /^(.){3,50}$/ },
    company_url: { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ },
    salary_min:  { type: Number, required: true },
    salary_max:  { type: Number, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
