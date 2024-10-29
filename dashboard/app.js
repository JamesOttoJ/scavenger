var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

axios.defaults.withCredentials = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  

app.use('/app/login', loginRouter);

app.use((err, req, res, next) => {
  console.log("middleware")
  console.log(req.cookies)
  if (req.cookies.username === 'undefined' || req.cookie.username === '') {
    return res.redirect('/app/login');
  }
  next();
});

app.use('/app/', indexRouter);
app.get('/app/dashboard', (req, res, err) => {
  if (!req.cookies || !req.cookies.username) {
    return res.redirect('/app/login');
  }
  console.log("Rendering dashboard");
  res.render("dashboard", { username: req.cookies.username });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var port = process.env.PORT || 8001;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

module.exports = app;
