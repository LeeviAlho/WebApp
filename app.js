// Require libraries
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var session = require("express-session");

// Include external files
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userviewRouter = require("./routes/userview");
var loginRouter = require("./routes/login");
var signRouter = require("./routes/sign");
var ownpageRouter = require("./routes/ownpage");

// Start the app itself
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "maanantaiaamut",
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 900000 }
  })
);

// Define routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/userview", userviewRouter);
app.use("/login", loginRouter);
app.use("/sign", signRouter);
app.use("/ownpage", ownpageRouter);

//used global variables
//this holds up all post information
app.set("postStorrage", []);
//this saves the current looked at user
app.set("userinfo", []);
//this stores all the useraccounts
app.set("userbase", []);

//title and subtitle set as global variables
app.set("title", "WASP");
app.set("subtitle", "Web Applications Social Platform");

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Register error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: app.get("title"),
    subtitle: app.get("subtitle")
  });
});

// Export app to use with www.js
module.exports = app;
