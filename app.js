// configuramos app
var express = require("express");
var app = express();
app.configure(function () {
    console.log('Configuring app');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    });
    app.use(app.router);
});

// importamos las rutas
var indexRoutes    = require('./routes/index-routes.js')(app);
var jobRoutes      = require('./routes/job-routes.js')(app);
var meetupRoutes   = require('./routes/meetup-routes.js')(app);
var resourceRoutes = require('./routes/resource-routes.js')(app);

// cargamos la configuracion
var config = require('./util/config.js');

console.log('NODE_ENV    =', process.env.NODE_ENV);
console.log('environment =', config.properties.environment);
console.log('--------------------------------------------');

// arrancamos el servidor
var http = require("http");
var server = http.createServer(app);
var port = process.env.PORT || config.properties.port;
server.listen(port, function () {
    console.log('node server running on port', port);
});

// conectamos con la base de datos
var mongoose = require('mongoose');
mongoose.connect(config.properties.urlMongoDB, function (error, res) {
    if (error) {
        console.log('ERROR: connecting to MongoDB Database. ' + error);
    } else {
        console.log('Connected to MongoDB Database');
    }
});
