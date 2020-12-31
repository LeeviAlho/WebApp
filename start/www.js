//modules

var app = require("../app");
var http = require("http");

// Reading env variables (config example from https://github.com/sclorg/nodejs-ex/blob/master/server.js)
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

//setting the port, reating the server and listening on the port 8080
app.set("port", port);

var server = http.createServer(app);

server.listen(port);
