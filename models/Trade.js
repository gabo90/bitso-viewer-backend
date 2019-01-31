var mongoose = require('mongoose');
var moment = require('moment');

var TradeSchema = new mongoose.Schema(
{
	book: { type: String, required: true, index: true },
	tid: { type: Number, required: true, index: true },
  	amount: { type: String, required: true },
	rate: { type: String, required: true },
	value: { type: String, required: true },
	maker_side: { type: Number },
  	created_at: { type: Date, default: Date.now }
},
{ collection: "trades" });

module.exports = mongoose.model('Trade', TradeSchema);