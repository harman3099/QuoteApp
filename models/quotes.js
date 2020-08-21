const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  username: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true} 
})


module.exports = mongoose.model('Quote', quoteSchema);