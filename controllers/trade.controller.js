'use strict';
var TradeService = require('../services/trade.service.js');

exports.getTrades = async function(req, res, next) {
  try {
    var stages = [];
    var from_date = req.body.from_date ? req.body.from_date : req.query.from_date;
    var to_date = req.body.to_date ? req.body.to_date : req.query.to_date;
    
    if (from_date && to_date)
    {
      var match = { $match: { created_at: { $gte: new Date(from_date), $lte: new Date(to_date) } } };
      stages.push(match);
    }

    var project = { $project: { _id: 0, tid: 1, book: 1, amount: 1, rate: 1, value: 1, maker_side: 1, created_at: 1 } };
    stages.push(project);
    
    var sort = { $sort: { created_at: 1 }};
    stages.push(sort);

    await TradeService.getTrades(stages)
    .then(function(trades) {
      return res.status(200).json(trades);
    });

  }
  catch(e) {
    return res.status(400).json({message: e.message});
  }
}

exports.createTrade = async function(req, res, next) {
  try {
    var trade = req.body;

    await TradeService.createTrade(trade)
    .then(function(createdTrade){
      return res.status(201).json(createdTrade);      
    });
  }
  catch(e) {
    return res.status(400).json({message: e.message});
  }
}