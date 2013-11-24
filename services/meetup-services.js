var Meetup = require('../models/meetup.js');

var findAllMeetups = function(options) {

    console.log('services/meetup-services.js/findAllMeetups');
    //console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Meetup.find()
       .sort({'date': -1})
       .exec(function(error, meetups) {

        if(!error) {

            printMeetups(meetups);
            options.onSuccess(meetups);

        } else {

            console.log('ERROR retrieving meetups: ' + error);
            options.onError(error);
        }
    });
};

var findMeetupById = function(options) {

    console.log('services/meetup-services.js/findMeetupById');
    //console.log('options=%j', options);

    options.meetupId  = options.meetupId  || 0;
    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Meetup.findById(options.meetupId, function(error, meetup) {

        if(!error) {

            if(meetup) {

                printMeetup(meetup);
                options.onSuccess(meetup);

            } else {

                var errorMessage = 'Meetup not found';
                console.log('ERROR retrieving meetup with meetupId="' + options.meetupId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving meetup with meetupId="' + options.meetupId + '": ' + error);
            options.onError(error);
        }
    });
};

var saveMeetup = function(options) {

    console.log('services/meetup-services.js/saveMeetup');
    //console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    var meetup = options.meetup || new Meetup({
        title: options.title,
        desc:  options.desc,
        date:  options.date,
        url:   options.url
    });

    meetup.save(function(error, newMeetup) {

      if(!error && newMeetup) {

        printMeetup(meetup, 'saved');
        options.onSuccess(newMeetup);

      } else {

        console.log('ERROR saving meetup=' + meetup + ': ' + error);
        options.onError(error);
      }
    });
};

var findMeetupByIdAndUpdate = function(options) {

    console.log('services/meetup-services.js/findMeetupByIdAndUpdate');
    console.log('options=%j', options);

    findMeetupById({
        meetupId: options.meetupId,
        onSuccess: function(meetup) {

            meetup.title = options.title;
            meetup.desc  = options.desc;
            meetup.date  = options.date;
            meetup.url   = options.url;

            saveMeetup({
                meetup:    meetup,
                onSuccess: options.onSuccess,
                onError:   options.onError
            });
        },
        onError : options.onError,
    });

};

var findMeetupByIdAndRemove = function(options) {

    console.log('services/meetup-services.js/findMeetupByIdAndRemove');
    //console.log('options=%j', options);

    findMeetupById({
        meetupId: options.meetupId,
        onSuccess: function(meetup) {

            meetup.remove(function(error) {

                if(!error) {

                    printMeetup(meetup, 'removed');
                    options.onSuccess(meetup);

                } else {

                    console.log('ERROR removing meetup=' + meetup + ': ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });

};

var printMeetups = function(meetups) {

    console.log(meetups.length +' meetups received');
};

var printMeetup = function(meetup, message) {

    if (message) {
        console.log('meetup ', message);
    }

    console.log("meetup =", meetup);
};

exports.findAllMeetups          = findAllMeetups;
exports.findMeetupById          = findMeetupById;
exports.saveMeetup              = saveMeetup;
exports.findMeetupByIdAndUpdate = findMeetupByIdAndUpdate;
exports.findMeetupByIdAndRemove = findMeetupByIdAndRemove;
