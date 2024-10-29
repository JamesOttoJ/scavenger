var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', (req, res, next) => {
  console.log("login");
  username = req.body.username
  password = req.body.password
  if (username == "admin" && password == "WeirdPassword#*(*#") {
    console.log("Logging in as admin");
    res.cookie("username", username, { path: "/app", httpOnly: false, maxAge: 60 * 60 * 1000 });
    return res.redirect("/app/dashboard");
  } else if (username != "admin") { 
    console.log("logging in as " + username);
    res.cookie("username", username, { path: "/app", httpOnly: false, maxAge: 60 * 60 * 1000 });
    return res.redirect("/app/dashboard");
  }
  res.redirect('/app/login');;
});

module.exports = router;
