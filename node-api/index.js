// Reading from the config file
const config = require('./common/config/env.config.js');

/**the process.env.PORT is provided by azure hosting environment at runtime. Without this, the node server will not work*/
config.port = process.env.PORT || config.port;

// Import express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

/** Import all the routes created by us here */
const UsersRouter = require('./users/routes.config');
const AuthRouter = require('./authorization/routes.config');
const HeatRouter = require('./heatmap/routes.config');

// Listens to all requests and adds CORS headers if not available
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    // Sometimes Client makes options request before making any other requests such as PUT and POST for security

    // If OPTIONS request, it sends response with 200 OK response, otherwise, request just mover to next middleware
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());

// Parse the url and match with configured routes
UsersRouter.routesConfig(app);
AuthRouter.routesConfig(app);
HeatRouter.routesConfig(app);

console.log(config.port);

var server = app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});

module.exports = server;
