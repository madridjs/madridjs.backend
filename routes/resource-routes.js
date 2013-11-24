module.exports = function(app) {

    var Sanitizer       = require('sanitizer');
    var AddRoute        = require('../util/add-route.js');
    var ResourceService = require('../services/resource-services.js');

    // GET - Return all resources in the DB
    var findResources = function(req, res) {

        console.log('GET - routes/resource-routes.js/findResources');

        ResourceService.findAllResources({

            onSuccess: function(resources) {
                res.jsonp(resources);
            },

            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // GET - Return all resources with specified meetup ID
    var findResourcesByMeetupId = function(req, res) {

        console.log('GET - routes/resource-routes.js/findResourcesByMeetupId');

        var meetupId = Sanitizer.sanitize(req.params.meetupId);
        console.log('meetupId =', meetupId);

        ResourceService.findAllResourcesByMeetupId({

            meetupId: meetupId,

            onSuccess: function(resources) {
                res.jsonp(resources);
            },

            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // GET - Return a resource with specified ID
    var findResource = function(req, res) {

        console.log('GET - routes/resource-routes.js/findResource');

        var resourceId = Sanitizer.sanitize(req.params.resourceId);
        console.log('resourceId =', resourceId);

        ResourceService.findResourceById({

            resourceId: resourceId,

            onSuccess: function(resource) {
                res.jsonp(resource);
            },

            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // POST - Insert a new resource in the DB
    var addResource = function(req, res) {

        console.log('POST - routes/resource-routes.js/addResource');

        ResourceService.saveResource({

            title:    Sanitizer.sanitize(req.body.title),
            desc:     Sanitizer.sanitize(req.body.desc),
            date:     Sanitizer.sanitize(req.body.date),
            url:      Sanitizer.sanitize(req.body.url),
            type:     Sanitizer.sanitize(req.body.type),
            meetupId: Sanitizer.sanitize(req.body.meetupId),

            onSuccess: function(resource) {
                res.jsonp(resource);
            },

            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // PUT - Update a register already exists
    var updateResource = function(req, res) {

        console.log('PUT - routes/resource-routes.js/updateResource');

        var resourceId = Sanitizer.sanitize(req.params.resourceId);
        console.log('resourceId =', resourceId);

        ResourceService.findResourceByIdAndUpdate({

            resourceId: resourceId,
            title:      Sanitizer.sanitize(req.body.title),
            desc:       Sanitizer.sanitize(req.body.desc),
            date:       Sanitizer.sanitize(req.body.date),
            url:        Sanitizer.sanitize(req.body.url),
            type:       Sanitizer.sanitize(req.body.type),
            meetupId:   Sanitizer.sanitize(req.body.meeupId),


            onSuccess: function(resource) {
                res.jsonp(resource);
            },

            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // DELETE - Delete a resource with specified ID
    var deleteResource = function(req, res) {

        console.log('DELETE - routes/resource-routes.js/deleteResource');

        var resourceId = Sanitizer.sanitize(req.params.resourceId);
        console.log('resourceId =', resourceId);

        ResourceService.findResourceByIdAndRemove({

            resourceId: resourceId,

            onSuccess: function(resource) {
                res.jsonp(resource);
            },

            onError: function(error) {
                res.jsonp({error:error});
            },
        });
    };

    // Link routes and functions
    AddRoute.get(    app,                     '/resource',
                     findResources,           'findResources');
    AddRoute.get(    app,                     '/meetup/:meetupId/resource', 
                     findResourcesByMeetupId, 'findResourcesByMeetupId');
    AddRoute.get(    app,                     '/resource/:resourceId',
                     findResource,            'findResource');
    AddRoute.post(   app,                     '/resource',
                     addResource,             'addResource');
    AddRoute.put(    app,                     '/resource/:resourceId',
                     updateResource,          'updateResource');
    AddRoute.delete( app,                     '/resource/:resourceId',
                     deleteResource,          'deleteResource');
}
