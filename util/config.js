
madridjswebbackend

var development = {

    environment             : 'development',
    port                    : 5000,
    urlMongoDB              : 'mongodb://localhost/madridjs-web-backend-v01'
}

var stage = {

    environment             : 'stage',
    port                    : 5000,
    urlMongoDB              : 'mongodb://madridjswebbackend:ds057548@ds057548.mongolab.com:57548/madridjswebbackend'
}

var production = {

    environment             : 'production',
    port                    : 5000,
    urlMongoDB              : 'mongodb://madridjswebbackend:ds057548@ds057548.mongolab.com:57548/madridjswebbackend'
}

var env = process.env.NODE_ENV;

switch (env) {
    case 'development':
        exports.properties = development;
        break;
    case 'stage':
        exports.properties = stage;
        break;
    default:
        exports.properties = production;
        break;
}
