var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var worldSchema = new Schema({
  id: Number,
  name:  String,
  maxNumberOfCharacters: Number,
  minNumberOfCharacters: Number,
  dateCreated: { type: Date, default: Date.now },
  private: Boolean,
  year: Number,
  description: String,
  tags: [String],
  joinWithModeratorApproval: Boolean,
  maxAgeOfCharacters: Number,
});

module.exports = mongoose.model('worlds', worldSchema);