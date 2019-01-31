'use strict';
var express = require('express');
var tradeRouter = express.Router();
var TradeController = require('../../../controllers/trade.controller');

tradeRouter.get('/', TradeController.getTrades);
tradeRouter.post('/', TradeController.createTrade);

module.exports = tradeRouter;
