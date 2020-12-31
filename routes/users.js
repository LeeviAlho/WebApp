var express = require("express");
var router = express.Router();

const { body } = require("express-validator");

// Seach for user page
router.get("/", function (req, res, next) {
  var postdata = req.app.get("postStorrage");

  res.render("users", {
    title: req.app.get("title"),
    subtitle: req.app.get("subtitle"),
    user: req.session.username,
    posts: postdata,
    errormessage: false
  });
});

//Searches the user input for a possible mach
router.post("/create", body("*").trim().escape(), function (req, res, next) {
  if (req.app.get("userbase").indexOf(req.body.author) < 0) {
    var postdata = req.app.get("postStorrage");
    //If no user with the name was found, refresh the page with error message
    res.render("users", {
      title: req.app.get("title"),
      subtitle: req.app.get("subtitle"),
      user: req.session.username,
      posts: postdata,
      errormessage: true
    });
  } else {
    var username = req.body.author;
    console.log("Searched for: " + username);
    req.app.get("userinfo").pop();
    req.app.get("userinfo").push(username);

    //Go to userview-page with note of the sellected user
    res.redirect("/userview");
  }
});

module.exports = router;
