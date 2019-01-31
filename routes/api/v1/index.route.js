'use strict';
var express = require('express');
var router = express.Router();
var tradesRouter = require('./trades.route');


router.get('/', function(req, res, next) {
  res.json("API v 0.0.1");
});
router.use('/trades', tradesRouter);

module.exports = router;
