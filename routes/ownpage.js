var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

var username;

//users own page
router.get("/", function (req, res, next) {
  if (req.app.get("postStorrage")) {
    var postdata = req.app.get("postStorrage");
  }

  //if user hasn't logged in, is returned to the login page
  if (req.session.username) {
    username = req.session.username;
  } else {
    res.redirect("/login");
  }
  console.log("Own page visited by: " + username);
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }

  res.render("ownpage", {
    title: req.app.get("title"),
    subtitle: req.app.get("subtitle"),
    posts: postdata,
    author: username,
    user: req.session.username,
    cookietimer: req.session.views
  });
});

//when the user logs out, their session usernamedata is deleted
router.get("/logout", function (req, res) {
  console.log("Logging out: " + username);
  req.session.username = "";
  res.redirect("/");
});

//let's the user post messages on their personal page
router.post("/create", body("*").trim().escape(), function (req, res, next) {
  var local_message = req.body.message;
  var local_author = req.session.username;

  var local_time = new Date();
  console.log("Sent message: " + local_message);
  console.log("from: " + local_author);
  console.log("At: " + local_time);

  req.app.get("postStorrage").unshift({
    author: local_author,
    message: local_message,
    time: local_time
  });

  res.redirect("/ownpage");
});

module.exports = router;
