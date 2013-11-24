var Job = require('../models/job.js');

var findAllJobs = function(options) {

    console.log('services/job-services.js/findAllJobs');
    //console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Job.find()
       .sort({'date': -1})
       .exec(function(error, jobs) {

        if(!error) {

            printJobs(jobs);
            options.onSuccess(jobs);

        } else {

            console.log('ERROR retrieving jobs: ' + error);
            options.onError(error);
        }
    });
};

var findJobById = function(options) {

    console.log('services/job-services.js/findJobById');
    //console.log('options=%j', options);

    options.jobId     = options.jobId     || 0;
    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    Job.findById(options.jobId, function(error, job) {

        if(!error) {

            if(job) {

                printJob(job);
                options.onSuccess(job);

            } else {

                var errorMessage = 'Job not found';
                console.log('ERROR retrieving job with jobId="' + options.jobId + '": ' + errorMessage);
                options.onError(errorMessage);
            }
        } else {

            console.log('ERROR retrieving job with jobId="' + options.jobId + '": ' + error);
            options.onError(error);
        }
    });
};

var saveJob = function(options) {

    console.log('services/job-services.js/saveJob');
    //console.log('options=%j', options);

    options.onSuccess = options.onSuccess || function() {};
    options.onError   = options.onError   || function() {};

    var job = options.job || new Job({
        title:       options.title,
        desc:        options.desc,
        date:        options.date,
        url:         options.url,
        company:     options.company,
        company_url: options.company_url,
        salary_min:  options.salary_min,
        salary_max:  options.salary_max
    });

    job.save(function(error, newJob) {

      if(!error && newJob) {

        printJob(job, 'saved');
        options.onSuccess(newJob);

      } else {

        console.log('ERROR saving job=' + job + ': ' + error);
        options.onError(error);
      }
    });
};

var findJobByIdAndUpdate = function(options) {

    console.log('services/job-services.js/findJobByIdAndUpdate');
    //console.log('options=%j', options);

    findJobById({
        jobId: options.jobId,
        onSuccess: function(job) {

            job.title       = options.title;
            job.desc        = options.desc;
            job.date        = options.date;
            job.url         = options.url;
            job.company     = options.company;
            job.company_url = options.company_url;
            job.salary_min  = options.salary_min;
            job.salary_max  = options.salary_max;

            saveJob({
                job:       job,
                onSuccess: options.onSuccess,
                onError:   options.onError
            });
        },
        onError : options.onError,
    });

};

var findJobByIdAndRemove = function(options) {

    console.log('services/job-services.js/findJobByIdAndRemove');
    //console.log('options=%j', options);

    findJobById({
        jobId: options.jobId,
        onSuccess: function(job) {

            job.remove(function(error) {

                if(!error) {

                    printJob(job, 'removed');
                    options.onSuccess(job);

                } else {

                    console.log('ERROR removing job=' + job + ': ' + error);
                    options.onError(error);
                }
            });
        },
        onError : options.onError
    });

};

var printJobs = function(jobs) {

    console.log(jobs.length +' jobs received');
};

var printJob = function(job, message) {

    if (message) {
        console.log('job ', message);
    }

    console.log("job =", job);
};

exports.findAllJobs          = findAllJobs;
exports.findJobById          = findJobById;
exports.saveJob              = saveJob;
exports.findJobByIdAndUpdate = findJobByIdAndUpdate;
exports.findJobByIdAndRemove = findJobByIdAndRemove;
