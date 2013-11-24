MadridJS web backend
====================

Just a RESTfull API.

[http://madridjs-web-backend.herokuapp.com/](http://madridjs-web-backend.herokuapp.com/)

- method "GET" to "/" to execute "getHelp"

# JOBS

~~~
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
~~~

- method "GET" to "/job" to execute "findJobs"
- method "GET" to "/job/:jobId" to execute "findJob"
- method "POST" to "/job" to execute "addJob"
- method "PUT" to "/job/:jobId" to execute "updateJob"
- method "DELETE" to "/job/:jobId" to execute "deleteJob"

# MEETUPS

var meetupSchema = new Schema({
    title: { type: String, required: true, match: /^(.){3,100}$/ },
    desc:  { type: String, required: true, match: /^(.){3,1000}$/ },
    date:  { type: Date,   required: true },
    url:   { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ }
});

- method "GET" to "/meetup" to execute "findMeetups"
- method "GET" to "/meetup/:meetupId" to execute "findMeetup"
- method "POST" to "/meetup" to execute "addMeetup"
- method "PUT" to "/meetup/:meetupId" to execute "updateMeetup"
- method "DELETE" to "/meetup/:meetupId" to execute "deleteMeetup"

# RESOURCES

- method "GET" to "/resource" to execute "findResources"
- method "GET" to "/meetup/:meetupId/resource" to execute "findResourcesByMeetupId"
- method "GET" to "/resource/:resourceId" to execute "findResource"
- method "POST" to "/resource" to execute "addResource"
- method "PUT" to "/resource/:resourceId" to execute "updateResource"
- method "DELETE" to "/resource/:resourceId" to execute "deleteResource"

