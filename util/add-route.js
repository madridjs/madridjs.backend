var routes = [];

var getRequest = function(app, url, callback, desc) {

    routes.push({
        method  : "GET",
        url     : url,
        desc    : desc
    });

    app.get(url, callback);
};

var postRequest = function(app, url, callback, desc) {

    routes.push({
        method  : "POST",
        url     : url,
        desc    : desc
    });

    app.post(url, callback);
};

var putRequest = function(app, url, callback, desc) {

    routes.push({
        method  : "PUT",
        url     : url,
        desc    : desc
    });

    app.put(url, callback);
};

var deleteRequest = function(app, url, callback, desc) {

    routes.push({
        method  : "DELETE",
        url     : url,
        desc    : desc
    });

    app.delete(url, callback);
};

exports.routes = routes;
exports.get    = getRequest;
exports.post   = postRequest;
exports.put    = putRequest;
exports.delete = deleteRequest;
