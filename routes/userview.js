var express = require("express");
var router = express.Router();

var ownpage = false;
var username;

// Searched users page
router.get("/", function (req, res, next) {
  if (req.app.get("postStorrage")) {
    var postdata = req.app.get("postStorrage");
  }
  username = req.app.get("userinfo")[0];
  //if searched user is the user themselves, they get sent to their own page
  if (req.session.username === username) {
    res.redirect("/ownpage");
  }
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.render("userview", {
    title: req.app.get("title"),
    subtitle: req.app.get("subtitle"),
    posts: postdata,
    author: username,
    user: req.session.username,
    cookietimer: req.session.views,
    form: ownpage
  });
});

module.exports = router;
