var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

//login page
router.get("/", function (req, res, next) {
  if (req.session.username) {
    res.redirect("/ownpage");
  } else {
    res.render("login", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      user: req.session.username,
      errormessage: false
    });
  }
});

router.post("/", body("*").trim().escape().isLength({ min: 1 }), function (
  req,
  res,
  next
) {
  if (req.app.get("userbase").indexOf(req.body.author) < 0) {
    //If no user was found with that username, the page is loaded with an error-card
    res.render("login", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      user: req.session.username,
      errormessage: true
    });
  } else {
    var username = req.body.author;
    console.log("Searched for: " + username);
    //
    //Go to userview-page with username saved in the user session
    req.session.username = username;
    res.redirect("/ownpage");
  }
  //
});

module.exports = router;
