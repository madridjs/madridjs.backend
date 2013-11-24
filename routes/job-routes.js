module.exports = function(app) {

    var Sanitizer  = require('sanitizer');
    var AddRoute   = require('../util/add-route.js');
    var JobService = require('../services/job-services.js');

    // GET - Return all jobs in the DB
    var findJobs = function(req, res) {

        console.log('GET - routes/job-routes.js/findJobs');

        JobService.findAllJobs({

            onSuccess: function(jobs) {
                res.jsonp(jobs);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // GET - Return a job with specified ID
    var findJob = function(req, res) {

        console.log('GET - routes/job-routes.js/findJob');

        var jobId = Sanitizer.sanitize(req.params.jobId);
        console.log('jobId =', jobId);

        JobService.findJobById({

            jobId: jobId,

            onSuccess: function(job) {
                res.jsonp(job);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // POST - Insert a new job in the DB
    var addJob = function(req, res) {

        console.log('POST - routes/job-routes.js/addJob');

        JobService.saveJob({

            title:       Sanitizer.sanitize(req.body.title),
            desc:        Sanitizer.sanitize(req.body.desc),
            date:        Sanitizer.sanitize(req.body.date),
            url:         Sanitizer.sanitize(req.body.url),
            company:     Sanitizer.sanitize(req.body.company),
            company_url: Sanitizer.sanitize(req.body.company_url),
            salary_min:  Sanitizer.sanitize(req.body.salary_min),
            salary_max:  Sanitizer.sanitize(req.body.salary_max),

            onSuccess: function(job) {
                res.jsonp(job);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // PUT - Update a register already exists
    var updateJob = function(req, res) {

        console.log('PUT - routes/job-routes.js/updateJob');

        var jobId = Sanitizer.sanitize(req.params.jobId);
        console.log('jobId =', jobId);

        JobService.findJobByIdAndUpdate({

            jobId:       jobId,
            title:       Sanitizer.sanitize(req.body.title),
            desc:        Sanitizer.sanitize(req.body.desc),
            date:        Sanitizer.sanitize(req.body.date),
            url:         Sanitizer.sanitize(req.body.url),
            company:     Sanitizer.sanitize(req.body.company),
            company_url: Sanitizer.sanitize(req.body.company_url),
            salary_min:  Sanitizer.sanitize(req.body.salary_min),
            salary_max:  Sanitizer.sanitize(req.body.salary_max),

            onSuccess: function(job) {
                res.jsonp(job);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // DELETE - Delete a job with specified ID
    var deleteJob = function(req, res) {

        console.log('DELETE - routes/job-routes.js/deleteJob');

        var jobId = Sanitizer.sanitize(req.params.jobId);
        console.log('jobId =', jobId);

        JobService.findJobByIdAndRemove({

            jobId: jobId,

            onSuccess: function(job) {
                res.jsonp(job);
            },

            onError: function(error) {
                res.jsonp({error:error});
            }
        });
    };

    // Link routes and functions
    AddRoute.get(    app, '/job',        findJobs,  'findJobs');
    AddRoute.get(    app, '/job/:jobId', findJob,   'findJob');
    AddRoute.post(   app, '/job',        addJob,    'addJob');
    AddRoute.put(    app, '/job/:jobId', updateJob, 'updateJob');
    AddRoute.delete( app, '/job/:jobId', deleteJob, 'deleteJob');

}
