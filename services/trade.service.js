'use strict';
var Trade = require('../models/Trade.js');

exports.getTrades = async function (stages) {
  return Trade.aggregate(stages)
}

exports.createTrade = async function(tradeParams) {
  return Trade.create(tradeParams)
}