var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

//home page
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");

  if (req.session.username) {
    var username = req.session.username;
    res.render("index", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      posts: postdata,
      author: username,
      user: req.session.username
    });
  } else {
    res.render("index", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      posts: postdata
    });
  }
});

//This is used, if the user has already logged in
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

  res.redirect("/");
});

module.exports = router;
