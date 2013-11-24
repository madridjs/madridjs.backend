module.exports = function(app) {

    var AddRoute    = require('../util/add-route.js');
    var Config      = require('../util/config.js');

    // GET - Return a help in JSON format
    var getHelp = function(req, res) {

        console.log('GET - routes/index-routes.js/getHelp');
        res.jsonp(AddRoute.routes);
    }

    // Link routes and functions
    AddRoute.get(app, '/', getHelp, 'getHelp');
}
