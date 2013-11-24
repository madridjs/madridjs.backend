var Resource = require('../models/resource.js');

var findAllResources = function(options) {

    console.log('services/resource-services.js/findAllResources');
    //console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Resource.find()
        .populate('meetup')
        .sort({'date': -1})
        .exec(function(error, resources) {

        if(!error) {

            printResources(resources);
            options.onSuccess(resources);

        } else {

            console.log('ERROR retrieving resources: ' + error);
            options.onError(error);
        }
    });
};


var findAllResourcesByMeetupId = function(options) {

    console.log('services/resource-services.js/findResourceByMail');
    //console.log('options=%j', options);

    options.meetupId   = options.meetupId   || 0;
    options.onSuccess  = options.onSuccess  || function() {};
    options.onNotFound = options.onNotFound || function() {};
    options.onError    = options.onError    || function() {};

    Resource.find({'meetup':options.meetupId})
        .populate('meetup')
        .sort({'date': -1})
        .exec(function(error, resources) {

        if(!error) {

            if(resources) {

                printResources(resources);
                options.onSuccess(resources);

            } else {

                console.log('Resources not found for meetupId=' + options.meetupId);
                options.onNotFound(errorMessage);
            }
        } else {

            console.log('ERROR retrieving resources: ' + error);
            options.onError(error);
        }
    });
};

var findResourceById = function(options) {

    console.log('services/resource-services.js/findResourceById');
    //console.log('options=%j', options);

    options.resourceId = options.resourceId || 0;
    options.onSuccess  = options.onSuccess  || function() {};
    options.onError    = options.onError    || function() {};

    Resource.findById(options.resourceId)
        .populate('meetup')
        .exec(function(error, resource) {

        if(!error) {

            if(resource) {

                printResource(resource);
                options.onSuccess(resource);

            } else {

                var errorMessage = 'Resource not found';
                console.log('ERROR retrieving resource with resourceId="' + options.resourceId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving resource with resourceId="' + options.resourceId + '": ' + error);
            options.onError(error);
        }
    });
};

var saveResource = function(options) {

    console.log('services/resource-services.js/saveResource');
    //console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    var resource = options.resource || new Resource({
        title:  options.title,
        desc:   options.desc,
        date:   options.date,
        url:    options.url,
        type:   options.type,
        meetup: options.meetupId
    });

    resource.save(function(error, newResource) {

      if(!error && newResource) {

        printResource(resource, 'saved');
        options.onSuccess(newResource);

      } else {

        console.log('ERROR saving resource=' + resource + ': ' + error);
        options.onError(error);
      }
    });
};

var findResourceByIdAndUpdate = function(options) {

    console.log('services/resource-services.js/findResourceByIdAndUpdate');
    //console.log('options=%j', options);

    findResourceById({
        resourceId: options.resourceId,
        onSuccess: function(resource) {

            resource.title  = options.title;
            resource.desc   = options.desc;
            resource.date   = options.date;
            resource.url    = options.url;
            resource.type   = options.type;
            resource.meetup = options.meetupId;

            saveResource({
                resource:  resource,
                onSuccess: options.onSuccess,
                onError:   options.onError
            });
        },
        onError : options.onError,
    });

};

var findResourceByIdAndRemove = function(options) {

    console.log('services/resource-services.js/findResourceByIdAndRemove');
    //console.log('options=%j', options);

    findResourceById({
        resourceId: options.resourceId,
        onSuccess: function(resource) {

            resource.remove(function(error) {

                if(!error) {

                    printResource(resource, 'removed');
                    options.onSuccess(resource);

                } else {

                    console.log('ERROR removing resource=' + resource + ': ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });

};

var printResources = function(resources) {

    console.log(resources.length +' resources received');
};

var printResource = function(resource, message) {

    if (message) {
        console.log('resource ', message);
    }

    console.log("resource =", resource);
};

exports.findAllResources           = findAllResources;
exports.findAllResourcesByMeetupId = findAllResourcesByMeetupId;
exports.findResourceById           = findResourceById;
exports.saveResource               = saveResource;
exports.findResourceByIdAndUpdate  = findResourceByIdAndUpdate;
exports.findResourceByIdAndRemove  = findResourceByIdAndRemove;
