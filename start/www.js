/**
 * Module dependencies.
 */

var app = require("../app");
var debug = require("debug")("test:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

// Reading env variables (config example from https://github.com/sclorg/nodejs-ex/blob/master/server.js)
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Event listener for HTTP server "listening" event.
 */
