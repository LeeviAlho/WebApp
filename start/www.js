/**
 * Module dependencies.
 */

var app = require("../app");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

// Reading env variables (config example from https://github.com/sclorg/nodejs-ex/blob/master/server.js)
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";

app.set("port", port);

var server = http.createServer(app);

server.listen(port);
