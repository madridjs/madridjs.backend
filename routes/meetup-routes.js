module.exports = function(app) {

    var Sanitizer     = require('sanitizer');
    var AddRoute      = require('../util/add-route.js');
    var MeetupService = require('../services/meetup-services.js');

    // GET - Return all meetups in the DB
    var findMeetups = function(req, res) {

        console.log('GET - routes/meetup-routes.js/findMeetups');

        MeetupService.findAllMeetups({

            onSuccess: function(meetups) {
                res.jsonp(meetups);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // GET - Return a meetup with specified ID
    var findMeetup = function(req, res) {

        console.log('GET - routes/meetup-routes.js/findMeetup');

        var meetupId = Sanitizer.sanitize(req.params.meetupId);
        console.log('meetupId =', meetupId);

        MeetupService.findMeetupById({

            meetupId: meetupId,

            onSuccess: function(meetup) {
                res.jsonp(meetup);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // POST - Insert a new meetup in the DB
    var addMeetup = function(req, res) {

        console.log('POST - routes/meetup-routes.js/addMeetup');

        MeetupService.saveMeetup({

            title: Sanitizer.sanitize(req.body.title),
            desc:  Sanitizer.sanitize(req.body.desc),
            date:  Sanitizer.sanitize(req.body.date),
            url:   (req.body.url),

            onSuccess: function(meetup) {
                res.jsonp(meetup);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // PUT - Update a register already exists
    var updateMeetup = function(req, res) {

        console.log('PUT - routes/meetup-routes.js/updateMeetup');

        var meetupId = Sanitizer.sanitize(req.params.meetupId);
        console.log('meetupId =', meetupId);

        MeetupService.findMeetupByIdAndUpdate({

            meetupId: meetupId,
            title:    Sanitizer.sanitize(req.body.title),
            desc:     Sanitizer.sanitize(req.body.desc),
            date:     Sanitizer.sanitize(req.body.date),
            url:      Sanitizer.sanitize(req.body.url),

            onSuccess: function(meetup) {
                res.jsonp(meetup);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // DELETE - Delete a meetup with specified ID
    var deleteMeetup = function(req, res) {

        console.log('DELETE - routes/meetup-routes.js/deleteMeetup');

        var meetupId = Sanitizer.sanitize(req.params.meetupId);
        console.log('meetupId =', meetupId);

        MeetupService.findMeetupByIdAndRemove({

            meetupId: meetupId,

            onSuccess: function(meetup) {
                res.jsonp(meetup);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // Link routes and functions
    AddRoute.get(    app, '/meetup',           findMeetups,  'findMeetups');
    AddRoute.get(    app, '/meetup/:meetupId', findMeetup,   'findMeetup');
    AddRoute.post(   app, '/meetup',           addMeetup,    'addMeetup');
    AddRoute.put(    app, '/meetup/:meetupId', updateMeetup, 'updateMeetup');
    AddRoute.delete( app, '/meetup/:meetupId', deleteMeetup, 'deleteMeetup');

}
