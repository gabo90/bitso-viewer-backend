var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var api_v1 = require('./routes/api/v1/index.route');
var app = express();
var mongoose = require('mongoose');

// use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/bitso-trades')
  .then(() => console.log('Connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware config
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
  res.setHeader('Access-Control-Allow-Credentials', false);
  
  if  (req.method === "OPTIONS")
  {
    return res.sendStatus(200);
  }
  next();
});

// routes config
app.use('/api/v1', api_v1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  var message = err.message;
  var error = req.app.get('env') === 'development' ? err : {};
  var status = err.status || 500;
  res.status(status).json({status: status, data: error.stack, message: message});
});

module.exports = app;
